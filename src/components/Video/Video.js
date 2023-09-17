import React from 'react';
import './Video.css';

function Video() {
    const videoSrc = "https://www.youtube.com/embed/_GrTLpCM01g";
    return (
        <section className="video-section">
            <div className="video-container">
                <iframe 
                    title="FutureSports Video"
                    src={videoSrc} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    )
}

export default Video;
