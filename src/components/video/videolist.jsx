import { useState, useEffect} from 'react';
import styles from "./videolist.module.css";

import api from "haru-service-api"

const VideoList = () => {
  const [isVideoListOpen, setIsVideoListOpen] = useState(true);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [data, setData] = useState({files:[]});

  useEffect(() => {
    // 1. Declare the async function inside the effect
    const fetchData = async () => {
      try {
        const result = await api.getVideoList();
        setData(result); // 2. Update state to trigger re-render
        setIsVideoListOpen(true);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

 const handlePlay = (event) => {
  const name = event.target.getAttribute("name");
  console.log("handlePlay,name=" + name);
  setCurrent(name);
  setIsPlayerOpen(true);
  setIsVideoListOpen(false);
 } 
 const handleExit = () => {
  setIsPlayerOpen(false);
  setIsVideoListOpen(true);
 }
 const to_mb = (bytes) => {
    const mb = bytes / (1024 ** 2);
    return mb.toFixed(2) + ' MB';
  } 
 const MB_PER_MINUTE = 300/15.38; 
 const estimateMinutes = (bytes) => {
    const mb = bytes / (1024 ** 2);
    if (mb <= 0) return 0;
    return (mb / MB_PER_MINUTE).toFixed(2);
 }

  return (
    <div className="main">
      {isVideoListOpen &&
        <div className={styles.video_list_container}>
          <table className={styles.video_table}>
            <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  </tr>
            </thead>
            <tbody>
                {/* 2. Use .map() to loop through the array and return table rows */}
                {data.files.map((item) => (
                <tr>
                    <td>
                      <button name={item.path} parent={item.parent_path} onClick={handlePlay} className={styles.link_button}>Play :: {item.name}</button>
                    </td>
                    <td>{to_mb(item.size)}</td>
                    <td>{estimateMinutes(item.size)}Min</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      }
      {isPlayerOpen &&
        <div className={styles.video_player_container}>
          <button onClick={handleExit} className={styles.link_button}>Exit</button>
          <video width="1000" controls>
              <source src={api.getViewEndPoint(current)} type="video/mp4"></source>
          </video>
        </div>
      }
      </div>
    );
};
export default VideoList; 