import React, { useEffect } from 'react';
import './Weather.css';

function Weather() {
    useEffect(() => {
        (function(d, s, id) {
            if (d.getElementById(id)) {
                if (window.__TOMORROW__) {
                    window.__TOMORROW__.renderWidget();
                }
                return;
            }
            const fjs = d.getElementsByTagName(s)[0];
            const js = d.createElement(s);
            js.id = id;
            js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'tomorrow-sdk');
    }, []);
    
    return (
        <section id="weather">
            <h2>Weather Updates</h2>
            <div className="tomorrow"
                data-location-id="006235,007408,004411,005621,006840,003919"
                data-language="EN"
                data-unit-system="METRIC"
                data-skin="dark"
                data-widget-type="current6"
                style={{ paddingBottom: "22px", position: "relative" }}
            >
                <a
                    href="https://www.tomorrow.io/weather-api/"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    style={{ position: "absolute", bottom: 0, transform: "translateX(-50%)", left: "50%" }}
                >
                    <img
                        alt="Powered by the Tomorrow.io Weather API"
                        src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
                        width="250"
                        height="18"
                    />
                </a>
            </div>
        </section>
    );
}

export default Weather;
