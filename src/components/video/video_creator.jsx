import { useState,useEffect } from "react";
import styles from "./video_creator.module.css"
import VideoMaker from "./video_maker"
import ChunkedUploader from "./file_upload_chunk"
import AudioList from "./audiolist"
import ImageViewer from "haru-reactjs-component-imageViewer"

import api from "haru-service-api";

const VideoCreator = () => {
  const [targetUploadPath,setTargetUploadPath] = useState("");
  const [isFileUploadOpen,setIsFileUploadOpen] = useState(false);
  const [isVideoMakerOpen,setIsVideoMakerOpen] = useState(false);
  const [isImageOpen,setIsImageOpen] = useState(false);
  const [name,setName] = useState("");
  const [parentName,setParentName] = useState("");
  const [list,setList] = useState([]);
  useEffect(() => {
    // 1. Declare the async function inside the effect
    const init = async () => {
      try {
        const result = await api.getVideoUploadPath();
        setTargetUploadPath(result.path); // 2. Update state to trigger re-render
        setIsFileUploadOpen(true);
        setIsImageOpen(false);
        setIsVideoMakerOpen(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    // 3. Call the function immediately
    init();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleOpenVideoMaker = async (event) => {
    console.log("handleOpenVideoMaker::called");
    setIsVideoMakerOpen(true); 
    setIsImageOpen(false);   
  }

  const handleFileUpload = (data) => {
    setIsVideoMakerOpen(false); 
    setIsFileUploadOpen(false); 
    setName(data.name);
    setList(data.files);
    setParentName(data.parent);
    setIsImageOpen(true);   
  }

  const handleExit = async (event) => {
    setIsFileUploadOpen(true);
    setIsVideoMakerOpen(false); 
    setIsImageOpen(false);   
  }

  // console.log("styles.div_image_cmd=" + styles.div_image_cmd);
  return (
    <div className="main">
        <div className={styles.video_creator_container}>
          {isFileUploadOpen &&
              <ChunkedUploader 
                title="Upload compressed photoes for making video"
                name={targetUploadPath}
                accept_type=".gz,.zip"
                onComplete={handleFileUpload}
              />  
          }
          {isImageOpen && 
              <div className={styles.video_creator_image}>
                <ImageViewer 
                  name={name}
                  list={list}
                  onContinue={handleOpenVideoMaker}
                  onExit={handleExit}
                  getViewEndPoint={api.getViewEndPoint}
                />  
              </div>
          }
          {isVideoMakerOpen && 
              <div className={styles.video_creator_maker}>
                <VideoMaker 
                  image_path={parentName}
                  onExit={handleExit}
                />
              </div>
          }          
        </div>
    </div>  
  );
}
export default VideoCreator;