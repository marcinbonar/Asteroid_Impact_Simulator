import React from 'react';
import Modal from 'react-modal';
import { Bar, Pie, Line } from 'react-chartjs-2';

const BatchSimulationResultsModal = ({
                                         isOpen,
                                         onRequestClose,
                                         simulationResults,
                                         materials,
                                         prepareChartData,
                                     }) => {
    if (!simulationResults.length) return null;

    const { craterSizes, materialCounts, impactEnergies } = prepareChartData();

    const craterSizesData = {
        labels: simulationResults.map((_, index) => `Symulacja ${index + 1}`),
        datasets: [
            {
                label: 'Rozmiar krateru (km)',
                data: craterSizes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const materialData = {
        labels: Object.keys(materialCounts),
        datasets: [
            {
                data: Object.values(materialCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const impactEnergyData = {
        labels: simulationResults.map((_, index) => `Symulacja ${index + 1}`),
        datasets: [
            {
                label: 'Energia uderzenia (GJ)',
                data: impactEnergies,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Wyniki Wielokrotnych Symulacji"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '95%',
                    height: '95%',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#f0f0f0',
                    overflowY: 'scroll',
                },
            }}
        >
            <h2>Wyniki Wielokrotnych Symulacji</h2>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <div style={{ width: '45%', height: '400px', marginBottom: '20px' }}>
                        <h3>Rozmiary kraterów</h3>
                        <Bar data={craterSizesData} options={options} />
                    </div>
                    <div style={{ width: '45%', height: '400px', marginBottom: '20px' }}>
                        <h3>Materiały asteroid</h3>
                        <Pie data={materialData} options={{ responsive: true }} />
                    </div>
                    <div style={{ width: '90%', height: '400px', marginBottom: '20px' }}>
                        <h3>Energie uderzeń</h3>
                        <Line data={impactEnergyData} options={options} />
                    </div>
                </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                <tr>
                    <th>Nr</th>
                    <th>Pozycja uderzenia (X, Y)</th>
                    <th>Średnica (m)</th>
                    <th>Prędkość (km/s)</th>
                    <th>Kąt (°)</th>
                    <th>Materiał</th>
                    <th>Rozmiar krateru (km)</th>
                    <th>Głębokość krateru (km)</th>
                    <th>Energia uderzenia (GJ)</th>
                    <th>Energia TNT (Megaton)</th>
                    <th>Rozmiar fali ognia (km)</th>
                    <th>Fala uderzeniowa (dB)</th>
                    <th>Magnituda (Mw)</th>
                    <th>Kierunek skutków</th>
                </tr>
                </thead>
                <tbody>
                {simulationResults.map((result, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            X: {result.position.x.toFixed(2)},
                            <br />
                            Y: {result.position.y.toFixed(2)}
                        </td>
                        <td>{parseFloat(result.diameter).toFixed(2)}</td>
                        <td>{parseFloat(result.speed).toFixed(2)}</td>
                        <td>{parseFloat(result.angle).toFixed(2)}</td>
                        <td>{result.material}</td>
                        <td>{result.craterSize}</td>
                        <td>{result.craterDepth}</td>
                        <td>{result.impactEnergy}</td>
                        <td>{result.impactEnergyTNT}</td>
                        <td>{result.fireballSize}</td>
                        <td>{result.shockwaveDecibels}</td>
                        <td>{result.earthquakeMagnitude}</td>
                        <td>{result.impactDirection}</td>
                    </tr>
                ))}
                </tbody>
            </table>
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

export default BatchSimulationResultsModal;
