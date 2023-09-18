// Importing React and necessary hooks for component creation
import React, { useState, useEffect } from 'react';
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import img7 from "./images/7.jpg";
import img8 from "./images/8.jpg";
import img9 from "./images/9.jpg";
import './Gallery.css';

// Function component for the Gallery
function Gallery() {
    // State for the currently displayed image's index
    const [currentIndex, setCurrentIndex] = useState(0);
    // State for controlling the visibility of the image overlay/modal
    const [showOverlay, setShowOverlay] = useState(false);

    // image list
    const images = [
        { src: img1, alt: "Image 1" },
        { src: img2, alt: "Image 2" },
        { src: img3, alt: "Image 3" },
        { src: img4, alt: "Image 4" },
        { src: img5, alt: "Image 5" },
        { src: img6, alt: "Image 6" },
        { src: img7, alt: "Image 7" },
        { src: img8, alt: "Image 8" },
        { src: img9, alt: "Image 9" }
    ];
    
    
    // useEffect to cycle through images at an interval
    useEffect(() => {
        const slideImages = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);  // Every 5 seconds

        // Cleanup function to clear the interval 
        return () => {
            clearInterval(slideImages);
        }
    }, [images.length]);  // Dependency array to ensure it only reruns when image count changes

    // Handler to show the clicked image in an overlay/modal
    const handleImageClick = (index) => {
        setCurrentIndex(index);
        setShowOverlay(true);
    };

    // Handlers to cycle through the images in the overlay/modal
    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div>
            <section id="gallery">
                <h2>Gallery</h2>
                <div className="carousel">
                    {images.map((image, index) => (
                        <img 
                            key={index} 
                            src={image.src} 
                            alt={image.alt} 
                            onClick={() => handleImageClick(index)} 
                            className={index === currentIndex ? 'active' : ''}
                        />
                    ))}
                </div>
            </section>
            {showOverlay && (
                <div className="overlay">
                    <span className="arrow prevArrow" onClick={handlePrevClick}>&#10094;</span>
                    <span className="arrow nextArrow" onClick={handleNextClick}>&#10095;</span>
                    <img id="enlargedImg" src={images[currentIndex].src} alt={images[currentIndex].alt} />
                    <button id="closeButton" className="close-button" onClick={() => setShowOverlay(false)}></button>
                </div>
            )}
        </div>
    );
}

export default Gallery;
