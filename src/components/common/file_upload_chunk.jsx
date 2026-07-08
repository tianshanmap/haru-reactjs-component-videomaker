import { useState } from 'react';

import styles from './file_upload_form.module.css';

// import {
//   chunkUpload,
//   unzip
// } from "../api/api_service_8081";

import api from "haru-service-api";

function getFilenameWithoutExtension(filename) {
  const lastDotIndex = filename.lastIndexOf('.');
  
  // If no dot is found, return the original filename
  if (lastDotIndex === -1) return filename;
  
  return filename.substring(0, lastDotIndex);
}

// Simplified implementation based on
export default function ChunkedUploader({title,name,onComplete,accept_type}) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
  };
  const uploadFileInChunks = async () => {
    if (!file) return;

    setIsUploading(true);
    const fileId = await api.uploadFileInChunks(file,name,setProgress);
    console.log("uploadFileInChunks::fileId=" + fileId + ",json=" + JSON.stringify(fileId));
    setIsUploading(false);
    try {
        const data = await api.unzip(name + "/" + fileId,name);
        console.log("data.files=" + JSON.stringify(data));
        const filepath = name + "/" + getFilenameWithoutExtension(fileId);
        const view_data = await api.getFilelist(filepath,".jpeg");
        const data_forward = view_data.map(x => x.path);
        onComplete({
          name: data_forward[0],
          files: data_forward,
          parent: filepath, 
        }
        );
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.upload_form_container}>
      <h3>{title}</h3>
      <table className={styles.upload_form_table}>
        <tbody>
          <tr>
            <td>File to upload</td>
            <td><input type="file" onChange={handleFileChange} accept={accept_type}/></td>
          </tr>
          <tr>
            <td>Upload Progress</td>
            <td><progress value={progress} max="100" width="100%" /> ({progress}%) </td>
          </tr>
          <tr>
            <td colspan="2"><button className={styles.upload_form_button} onClick={uploadFileInChunks} disabled={!file || isUploading}>Upload</button></td>
          </tr>
        </tbody>        
      </table>
    </div>
  );
}