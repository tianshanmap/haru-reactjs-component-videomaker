import { useState, useEffect} from 'react';
import styles from "./audiolist.module.css";

import api from "haru-service-api"

const AudioList = () => {
  const [data, setData] = useState({files:[]});
  const [isPlayerOpen,setIsPlayerOpen] = useState(false);
  const [current,setCurrent] = useState("");
  const [name,setName] = useState("");

  useEffect(() => {
    // 1. Declare the async function inside the effect
    const fetchData = async () => {
      try {
        const result = await api.getAudioList();
        setData(result); // 2. Update state to trigger re-render
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount
  
  const to_kb = (bytes) => {
    const kb = bytes/1024;
    return kb.toFixed(2) + ' KB';
  } 
  const to_mb = (bytes) => {
    const mb = bytes / (1024 ** 2);
    return mb.toFixed(2) + ' MB';
  } 
  const kb_to_min = (bytes) => {
    const sizeInKb = bytes/1024;
    const totalSeconds = (sizeInKb * 8) / 128;
    return (totalSeconds / 60).toFixed(2); 
  }
  const handlePlay = (event) => {
    setCurrent(event.target.getAttribute("path"));
    setName(event.target.getAttribute("name"));
    setIsPlayerOpen(true);
  }

  return (
    <div className="main">
      <div className={styles.audio_container}>
        {isPlayerOpen &&
          <div className={styles.audio_player}>
              {name}
              <audio src={api.getViewEndPoint(current)} controls>
                  Your browser does not support the audio element.
              </audio>
          </div>
        }
        <div className={styles.audio_list_container}>
          <table className={styles.audio_table}>
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
                      <button name={item.name} path={item.path} parent={item.parent_path} className={styles.link_button} onClick={handlePlay} className={styles.link_button}>Play :: {item.name}</button>&nbsp;&nbsp;
                    </td>
                    <td>{kb_to_min(item.size)}Min</td>
                    <td>{to_mb(item.size)}</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};
export default AudioList; 