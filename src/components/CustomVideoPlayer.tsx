import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, ClosedCaption, Settings, Maximize, Volume2, VolumeX, Type, Monitor, Keyboard, Check } from 'lucide-react';

interface CustomVideoPlayerProps {
  url: string;
  poster?: string;
}

export default function CustomVideoPlayer({ url, poster }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [ccEnabled, setCcEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Handle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            if (error.name !== 'AbortError') {
              console.error("Video play failed:", error);
            }
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Skip Forward/Backward
  const skip = (amount: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount;
    }
  };

  // Handle Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle Progress Bar Click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  // Handle Volume
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle Playback Speed
  const changeSpeed = () => {
    if (videoRef.current) {
      const newSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
      videoRef.current.playbackRate = newSpeed;
      setPlaybackSpeed(newSpeed);
    }
  };

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Format Time
  const formatTime = (timeInSeconds: number) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substring(14, 19);
    return result;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800 group"
      onContextMenu={(e) => e.preventDefault()}
    >
      <video 
        ref={videoRef}
        src={url} 
        poster={poster}
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        controlsList="nodownload"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* CC Overlay (Mock) */}
      {ccEnabled && isPlaying && (
        <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
          <span className="bg-black/70 text-white px-4 py-1 rounded text-lg font-medium backdrop-blur-sm">
            [Transcription enabled - Auto-generating captions...]
          </span>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        
        {/* Progress Bar */}
        <div 
          className="w-full h-1.5 bg-slate-600/50 rounded-full mb-4 cursor-pointer relative overflow-hidden"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-indigo-400 transition-colors">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button onClick={() => skip(-10)} className="hover:text-indigo-400 transition-colors" title="Rewind 10s">
              <RotateCcw size={20} />
            </button>
            
            <button onClick={() => skip(10)} className="hover:text-indigo-400 transition-colors" title="Forward 10s">
              <RotateCw size={20} />
            </button>

            <div className="flex items-center gap-2 ml-2">
              <button onClick={toggleMute} className="hover:text-indigo-400 transition-colors">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <span className="text-xs font-medium font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setCcEnabled(!ccEnabled)} 
              className={`transition-colors ${ccEnabled ? 'text-indigo-400' : 'hover:text-indigo-400'}`}
              title="Transcription (CC)"
            >
              <ClosedCaption size={20} />
            </button>

            <button 
              onClick={changeSpeed} 
              className="text-sm font-bold hover:text-indigo-400 transition-colors w-8"
              title="Playback Speed"
            >
              {playbackSpeed}x
            </button>

            {/* Settings Menu Toggle */}
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)} 
                className={`transition-colors ${showSettings ? 'text-indigo-400' : 'hover:text-indigo-400'}`}
                title="Settings"
              >
                <Settings size={20} />
              </button>

              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute bottom-full right-0 mb-4 w-56 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-2 space-y-1">
                    <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                      <div className="flex items-center gap-2"><Type size={16} /> Caption Settings</div>
                      <Check size={14} className="text-indigo-400 opacity-0" />
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                      <div className="flex items-center gap-2"><Monitor size={16} /> Quality</div>
                      <span className="text-xs text-slate-500">Auto</span>
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                      <div className="flex items-center gap-2"><Keyboard size={16} /> Keyboard Shortcuts</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={toggleFullscreen} className="hover:text-indigo-400 transition-colors" title="Full Screen">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
