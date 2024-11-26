import React from 'react';

const SimulationSettings = ({
                                diameter,
                                setDiameter,
                                speed,
                                setSpeed,
                                angle,
                                setAngle,
                                material,
                                setMaterial,
                                materials,
                                startSimulation,
                                resetSingleSimulation,
                                simulationCount,
                                setSimulationCount,
                                startBatchSimulation,
                                resetMultipleSimulations,
                            }) => {
    return (
        <div className="form-container">
            <h2>Ustawienia Symulacji</h2>
            <div className="input-group">
                <label>Średnica (m): </label>
                <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Prędkość (km/s): </label>
                <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Kąt wejścia (°): </label>
                <input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} />
            </div>
            <div className="input-group">
                <label>Materiał asteroidy: </label>
                <select value={material} onChange={(e) => setMaterial(e.target.value)}>
                    <option value="" disabled>
                        Wybierz materiał
                    </option>
                    {materials.map((mat) => (
                        <option key={mat} value={mat}>
                            {mat}
                        </option>
                    ))}
                </select>
            </div>
            <button className="start-button" onClick={startSimulation}>
                Start Symulacji
            </button>
            <button className="reset-button" onClick={resetSingleSimulation}>
                Reset Symulacji Pojedynczej
            </button>

            <h2>Wielokrotne Symulacje</h2>
            <div className="input-group">
                <label>Liczba symulacji: </label>
                <input
                    type="number"
                    value={simulationCount}
                    onChange={(e) => setSimulationCount(parseInt(e.target.value))}
                    min="1"
                />
            </div>
            <button className="start-button" onClick={startBatchSimulation}>
                Start Wielokrotnych Symulacji
            </button>
            <button className="reset-button" onClick={resetMultipleSimulations}>
                Reset Symulacji Wielokrotnych
            </button>
        </div>
    );
};

export default SimulationSettings;
