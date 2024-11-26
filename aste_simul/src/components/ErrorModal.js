import React from 'react';
import Modal from 'react-modal';

const ErrorModal = ({ isOpen, onRequestClose, missingFields }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Błąd"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    border: '1px solid #f5c6cb',
                },
            }}
        >
            <h2>Błąd</h2>
            <p>Proszę uzupełnić następujące pola:</p>
            <ul>
                {missingFields.map((field, index) => (
                    <li key={index}>{field}</li>
                ))}
            </ul>
            <button
                onClick={onRequestClose}
                style={{
                    backgroundColor: '#f5c6cb',
                    color: '#721c24',
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

export default ErrorModal;
