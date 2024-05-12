import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactCardSlider from './ReactCartSlider';
import '../pages/Homepage.css';
import './Slider.css';
import logoImage from '../assets/Images/girl.png'
import loadingGif from '../assets/Images/loading.gif'
import playButtonImage from '../assets/Images/arrow_6909651.png';
import replayButtonImage from '../assets/Images/back-arrow_4013520.png';
import pauseButton from '../assets/Images/pause.png'
import downloadButton from '../assets/Images/download.png'
import crossButton from '../assets/Images/cross.png'

const HomeComponent = () =>{
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [error, setError] = useState(null);
    const { songDataArray } = location.state;
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [songData, setSongData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

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

    const handleSearch = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post('http://localhost:9292/getSong', { songName: searchQuery });
          setSongData(response.data);
        } catch (error) {
          setSongData(null);
          setError('Song not found');
        }
        setIsLoading(false);
      };

      const handleCross = () => {
        setSongData(null);
    }

    return (
        <div className='homemain-page'>
            <div className="left-container">
                <div className="maintext">
                    <h3>LayaXXX</h3>
                </div>
                <div className="logoimage1">
                    <img src={logoImage}/>
                </div>
            </div>
            <div className='right-container'>
                <div className="search-container">
                    <div className="searchBar">
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <button onClick={handleSearch}>Search</button>
                        {error && <p className="error">{error}</p>}
                        <div className='loadingGif'>
                            {isLoading && <img src={loadingGif} alt="Loading" />}
                        </div>
                    </div>
                </div>
                <div className="song-list-container">
                    <ReactCardSlider
                        slides={songDataArray.map((songData, index) => ({
                            image: songData.songImageUrl,
                            title: songData.songName,
                            id: songData.songId
                        }))}
                    />
                </div>
                <div>
                {songData && (<div className="song-container">
                    { 
                    <div className={`song-details ${songData ? 'visible' : 'hidden'}`}>
                        <div className="logotext">
                            LayaXXX
                        </div>
                        <div className="cross">
                            <img src={crossButton} className="custom-button2-small" alt="Replay" onClick={handleCross} />
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
                            <img src={downloadButton} className="custom-button1-small" alt="Pause" />
                            </a>
                            {isPlaying ? (
                            <img src={pauseButton}  className="custom-button1" alt="Pause" onClick={handlePlayPause} />
                            ) : (
                            <img src={playButtonImage} className="custom-button1" alt="Play" onClick={handlePlayPause} />
                            )}
                            <img src={replayButtonImage} className="custom-button1-small" alt="Replay" onClick={handleReplay} />
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
                    }
                </div>)}
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;