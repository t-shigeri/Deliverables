import React from 'react';
import '../style/Loading.css';

function Loading() {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <p className="loading-text">Enta Shigeri Portfolio</p>
                <div className="loading-line"></div>
            </div>
        </div>
    );
}

export default Loading;
