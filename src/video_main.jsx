import { useState } from 'react';
import VideoCreator from './components/video/video_creator';
import AudioList from './components/video/audiolist';
import VideoList from './components/video/videolist';
import styles from "./components/video_main.module.css"

export default function VideoMain() {
  // Track which component to show
  const [currentView, setCurrentView] = useState('home');

  return (
    <div>
      <div className={styles.video_buttons}>
        {/* Buttons that act like links */}
        <button 
          onClick={() => setCurrentView('home')} 
          className="link-button"
        >
          Create Video
        </button>
        
        <button 
          onClick={() => setCurrentView('audiolist')} 
          className="link-button"
        >
          Audio List
        </button>
        <button 
          onClick={() => setCurrentView('videolist')} 
          className="link-button"
        >
          Video List
        </button>
      </div>

      <main>
        {/* Render the component based on current state */}
        {currentView === 'home' && <VideoCreator />}
        {currentView === 'audiolist' && <AudioList />}
        {currentView === 'videolist' && <VideoList />}
      </main>
    </div>
  );
}
