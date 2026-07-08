import { useState } from 'react';
import VideoCreator from './video_creator';
import AudioList from './audiolist';
import VideoList from './videolist';
export default function VideoMain() {
  // Track which component to show
  const [currentView, setCurrentView] = useState('home');

  return (
    <div>
      <nav>
        {/* Buttons that act like links */}
        <button 
          onClick={() => setCurrentView('home')} 
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Create Video
        </button>
        
        <button 
          onClick={() => setCurrentView('audiolist')} 
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Audio List
        </button>
        <button 
          onClick={() => setCurrentView('videolist')} 
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Video List
        </button>
      </nav>

      <main>
        {/* Render the component based on current state */}
        {currentView === 'home' && <VideoCreator />}
        {currentView === 'audiolist' && <AudioList />}
        {currentView === 'videolist' && <VideoList />}
      </main>
    </div>
  );
}
