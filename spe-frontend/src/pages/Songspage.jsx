import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../pages/Songpage.css'; // Import the CSS file with the styles
import playButtonImage from '../assets/Images/arrow_6909651.png';
import replayButtonImage from '../assets/Images/back-arrow_4013520.png';
import pauseButton from '../assets/Images/pause.png'
import downloadButton from '../assets/Images/download.png'
import loadingGif from '../assets/Images/loading.gif'
import logoImage from '../assets/Images/girl.png'


const SongComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [songData, setSongData] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTime, setISFirstTime] = useState(false);

  const audioRef = useRef(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:9292/getSong', { songName: searchQuery });
      setSongData(response.data);
      setError(null);
    } catch (error) {
      setSongData(null);
      setError('Song not found');
    }
    setIsLoading(false);
    setISFirstTime(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleReplay = () => {
    setCurrentTime(0);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="song-container">
      <div>
        {isFirstTime === false && (
            <div className="main-page">
              <div className="maintext">
                <h3>Stream Music @</h3>
                LayaXXX
              </div>
              <div className="logoimage">
              <img src={logoImage}/>
              </div>
            </div>
        )}
      </div>
      <div className="searchBar">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        {error && <p className="error">{error}</p>}
        <div className='loadingGif'>
        {isLoading && <img src={loadingGif} alt="Loading" />}
        </div>
      </div>
      {isLoading === false && isFirstTime === true && <div>
        {songData && (
          <div className={`song-details ${songData ? 'visible' : 'hidden'}`}>
            <div className="logotext">
                LayaXXX
              </div>
            <img src={songData.songImageUrl} alt="Song Image" className="song-image" />
            <h2 className="song-name">{songData.songName}</h2>
            <div className="custom-audio-player">
              <input
                type="range"
                min="0"
                max={audioRef.current ? audioRef.current.duration : 0}
                value={currentTime}
                onChange={(e) => {
                  setCurrentTime(e.target.value);
                  audioRef.current.currentTime = e.target.value;
                }}
              />
              <div className="buttons">
                <a href={songData.songDownLoadUrl} download={songData.songName} className="download-link">
                  <img src={downloadButton} className="custom-button-small" alt="Pause" />
                </a>
                {isPlaying ? (
                  <img src={pauseButton}  className="custom-button" alt="Pause" onClick={handlePlayPause} />
                ) : (
                  <img src={playButtonImage} className="custom-button" alt="Play" onClick={handlePlayPause} />
                )}
                <img src={replayButtonImage} className="custom-button-small" alt="Replay" onClick={handleReplay} />
              </div>
            </div>
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              src={`data:audio/mp3;base64,${songData.songData}`}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
          
        )}
      </div>}
    </div>
  );
};

export default SongComponent;
