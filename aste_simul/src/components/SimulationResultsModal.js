import React from 'react';
import Modal from 'react-modal';

const SimulationResultsModal = ({ isOpen, onRequestClose, impactInfo, impactDirection }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Wyniki Symulacji"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#f0f0f0',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    width: '600px',
                },
            }}
        >
            <h2>Wyniki Symulacji</h2>
            {impactInfo && (
                <>
                    <p>Rozmiar krateru: {impactInfo.craterSize} km</p>
                    <p>Głębokość krateru: {impactInfo.craterDepth} km</p>
                    <p>Energia uderzenia: {impactInfo.impactEnergy} GJ</p>
                    <p>Energia ekwiwalentna TNT: {impactInfo.impactEnergyTNT} Megaton TNT</p>
                    <p>Rozmiar fali ognia: {impactInfo.fireballSize} km</p>
                    <p>Decybele fali uderzeniowej: {impactInfo.shockwaveDecibels} dB</p>
                    <p>Magnituda trzęsienia ziemi: {impactInfo.earthquakeMagnitude} Mw</p>
                    <p>Kierunek rozprzestrzeniania się skutków: {impactDirection}</p>
                    <p>Materiał: {impactInfo.material}</p>
                </>
            )}
            <button
                onClick={onRequestClose}
                style={{
                    backgroundColor: '#cccccc',
                    color: '#333',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}
            >
                Zamknij
            </button>
        </Modal>
    );
};

export default SimulationResultsModal;
