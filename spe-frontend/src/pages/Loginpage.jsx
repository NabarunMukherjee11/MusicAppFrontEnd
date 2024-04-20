import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/Loginpage.css';
import logoImage from '../assets/Images/girl.png'

const LoginComponent = () =>{
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpChange = (event) => {
      setOtp(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if (showOtpField) {
              // Send email and OTP to backend here
              const response = await axios.post('http://localhost:9292/verify-otp', { email: email, otp: otp });
              console.log('Response from server:', response.data);

              if (response.data.errorMessage !== undefined && response.data.errorMessage !== "") {
                // Display error message as an alert
                alert(response.data.errorMessage);
                // Refresh the login page
                window.location.reload();
              } else {
                // Redirect to HomePage with song data array
                const songDataArray = response.data;
                navigate('/homePage', { state: { songDataArray } });
              }
          } else {
              // Send email to backend to generate OTP
              const response = await axios.post('http://localhost:9292/generate-otp', { email: email });
              console.log('OTP generated:', response.data);
              // Show OTP field
              setShowOtpField(true);
          }
        } 
        catch (error) {
          console.error('Error:', error);
        }
    };

    return(
        <div className="main-page">
          <div className="center">
          <form onSubmit={handleSubmit}>
                <div className="input-container">
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    placeholder="email"
                />
                </div>
                {showOtpField && (
                    <div className="input-container">
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                            placeholder="enter OTP"
                        />
                    </div>
                )}
                <button type="submit">Get Started</button>
            </form>
          </div>
              <div className="maintext">
                <h3>Stream Music @</h3>
                LayaXXX
              </div>
              <div className="logoimage">
                <img src={logoImage}/>
              </div>
        </div>
    )
}

export default LoginComponent;