import { useState, useEffect} from 'react';
import styles from "./audiolist.module.css";

import api from "haru-service-api"

const AudioList = () => {
  const [data, setData] = useState({files:[]});

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

  return (
    <div className="main">
      <div className={styles.audio_list_container}>
        <table className={styles.audio_table}>
          <thead>
              <tr>
                <th></th>
                <th></th>
                </tr>
          </thead>
          <tbody>
              {/* 2. Use .map() to loop through the array and return table rows */}
              {data.files.map((item) => (
              <tr>
                  <td>{item.name}</td>
                  <td>
                  <audio src={api.getViewEndPoint(item.path)} controls>
                      Your browser does not support the audio element.
                  </audio>
                  </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};
export default AudioList; 