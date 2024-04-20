import React, { useState, useRef } from 'react';
import './Slider.css';
import { MdChevronLeft,MdChevronRight } from 'react-icons/md';
import playButtonImage from '../assets/Images/arrow_6909651.png';
import replayButtonImage from '../assets/Images/back-arrow_4013520.png';
import pauseButton from '../assets/Images/pause.png'
import downloadButton from '../assets/Images/download.png'
import crossButton from '../assets/Images/cross.png'
import axios from 'axios';

const ReactCardSlider =(props)=>{
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [currentTime, setCurrentTime] = useState(0);
    const [songData, setSongData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    const slideLeft =()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const slideRight =()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const handlePlay = async (songId) => {
        try {
            const response = await axios.get(`http://localhost:9292/song/${songId}`);
            setSongData(response.data);

        } catch (error) {
            console.error('Error fetching song:', error);
        }
    };

    const handleCross = () => {
        setSongData(null);
    }

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

    return(
        <div id="main-slider-container">
            <div className="slidermain">
                <MdChevronLeft size={40} className="slider-icon left" onClick={slideRight}/>
                <div id="slider">
                { 
                    props.slides.map((slide, index) => (
                        <div key={index} className={`slider-card ${index === currentIndex ? 'active' : ''}`}>
                            <div className="slider-card-image" style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover' }}></div>
                            <div className="slider-card-content">
                                <p className="slider-card-title">{slide.title}</p>
                                <img src={playButtonImage} className="slidercustom-button" alt="Play" onClick={() => handlePlay(slide.id)}/>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <MdChevronRight size={40} className="slider-icon right" onClick={slideLeft}/>
            </div>
            <div>
                {songData && (<div className="song-container">
                    { 
                    <div className={`song-details ${songData ? 'visible' : 'hidden'}`}>
                        <div className="logotext">
                            LayaXXX
                        </div>
                        <div className="cross">
                            <img src={crossButton} className="custom-button1-small" alt="Replay" onClick={handleCross} />
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

    )
}
export default ReactCardSlider;