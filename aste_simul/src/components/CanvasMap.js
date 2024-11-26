import React from 'react';
import kielceMap from '../img/Kielce.jpg';

const CanvasMap = ({ canvasRef, handleMapClick }) => {
    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                width={1200}
                height={800}
                onClick={handleMapClick}
                style={{ backgroundImage: `url(${kielceMap})`, backgroundSize: 'cover' }}
            />
        </div>
    );
};

export default CanvasMap;
