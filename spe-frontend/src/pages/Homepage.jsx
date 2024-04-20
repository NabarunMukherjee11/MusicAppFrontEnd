import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactCardSlider from './ReactCartSlider';
import '../pages/Homepage.css';
import logoImage from '../assets/Images/girl.png'
import loadingGif from '../assets/Images/loading.gif'

const HomeComponent = () =>{
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [error, setError] = useState(null);
    const { songDataArray } = location.state;
    const [isLoading, setIsLoading] = useState(false);

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
      };

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
                    <div className="maintext">
                        <h3>Popular Songs</h3>
                    </div>
                    <ReactCardSlider
                        slides={songDataArray.map((songData, index) => ({
                            image: songData.songImageUrl,
                            title: songData.songName,
                            id: songData.songId
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;