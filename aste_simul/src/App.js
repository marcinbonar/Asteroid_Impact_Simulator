import React, { useRef, useState } from 'react';
import SimulationSettings from './components/SimulationSettings';
import CanvasMap from './components/CanvasMap';
import SimulationResultsModal from './components/SimulationResultsModal';
import BatchSimulationResultsModal from "./components/ BatchSimulationResultsModal";
import ErrorModal from './components/ErrorModal';
import asteroidIcon from './img/asteroidIcon.jpg';
import {calculateImpactInfo} from "./utils/calculateImpactInfo";
import {prepareChartData} from "./utils/prepareChartData";
import {drawCustomPin} from "./utils/drawCustomPin";
import {drawImpactDirection} from "./utils/drawImpactDirection";
import {drawCrater} from "./utils/drawCrater";
import {materialDensity, materials} from "./constants/constants";
import Modal from 'react-modal';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import './App.css';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

Modal.setAppElement('#root');

const App = () => {
  const canvasRef = useRef(null);
  const [diameter, setDiameter] = useState('');
  const [speed, setSpeed] = useState('');
  const [angle, setAngle] = useState('');
  const [material, setMaterial] = useState('');
  const [impactPosition, setImpactPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [impactInfo, setImpactInfo] = useState(null);
  const [impactDirection, setImpactDirection] = useState(null);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const [simulationCount, setSimulationCount] = useState(1);
  const [simulationResults, setSimulationResults] = useState([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  const handleMapClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setImpactPosition({ x, y });

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCustomPin(ctx, x, y, asteroidIcon);
  };

  const startSimulation = () => {
    const missing = [];
    if (!diameter) missing.push('Średnica');
    if (!speed) missing.push('Prędkość');
    if (!angle) missing.push('Kąt wejścia');
    if (!material) missing.push('Materiał asteroidy');
    if (!impactPosition) missing.push('Miejsce uderzenia');

    if (missing.length > 0) {
      setMissingFields(missing);
      setIsErrorModalOpen(true);
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const diameterValue = parseFloat(diameter);
    const speedValue = parseFloat(speed);
    const angleValue = parseFloat(angle);

    drawCrater(ctx, impactPosition.x, impactPosition.y, diameterValue);
    drawImpactDirection(ctx, impactPosition.x, impactPosition.y, angleValue, setImpactDirection);

    const impactData = calculateImpactInfo(
        {
          diameter: diameterValue,
          speed: speedValue,
          angle: angleValue,
          material,
        },
        materialDensity
    );
    setImpactInfo(impactData);
    setIsModalOpen(true);
  };

  const startBatchSimulation = () => {
    if (!simulationCount || simulationCount <= 0) {
      alert('Proszę podać poprawną liczbę symulacji.');
      return;
    }

    const results = [];
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (let i = 0; i < simulationCount; i++) {
      const randomDiameter = Math.random() * (1000 - 10) + 10;
      const randomSpeed = Math.random() * (70 - 11) + 11;
      const randomAngle = Math.random() * (90 - 1) + 1;
      const randomMaterial = materials[Math.floor(Math.random() * materials.length)];

      const x = Math.random() * canvasRef.current.width;
      const y = Math.random() * canvasRef.current.height;

      const impactData = calculateImpactInfo(
          {
            diameter: randomDiameter,
            speed: randomSpeed,
            angle: randomAngle,
            material: randomMaterial,
          },
          materialDensity
      );

      impactData.position = { x, y };

      drawCrater(ctx, x, y, randomDiameter);
      drawImpactDirection(ctx, x, y, randomAngle, null);

      const length = 100;
      const randomOffset = (Math.random() - 0.5) * 10;
      const adjustedAngle = randomAngle + randomOffset;
      const radians = (adjustedAngle * Math.PI) / 180;
      const xEnd = x + length * Math.cos(radians);
      const yEnd = y + length * Math.sin(radians);
      impactData.impactDirection = `X: ${xEnd.toFixed(2)}, Y: ${yEnd.toFixed(2)}`;

      results.push(impactData);
    }

    setSimulationResults(results);
    setIsBatchModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeBatchModal = () => {
    setIsBatchModalOpen(false);
  };

  const resetSingleSimulation = () => {
    setDiameter('');
    setSpeed('');
    setAngle('');
    setMaterial('');
    setImpactPosition(null);
    setImpactInfo(null);
    setImpactDirection(null);
    setIsModalOpen(false);
    setMissingFields([]);
    setIsErrorModalOpen(false);

    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const resetMultipleSimulations = () => {
    setSimulationCount(1);
    setSimulationResults([]);
    setIsBatchModalOpen(false);

    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
      <div className="app-container">
        <h1>Symulacja spadania asteroidy na mapę Kielc</h1>
        <div className="content">
          <SimulationSettings
              diameter={diameter}
              setDiameter={setDiameter}
              speed={speed}
              setSpeed={setSpeed}
              angle={angle}
              setAngle={setAngle}
              material={material}
              setMaterial={setMaterial}
              materials={materials}
              startSimulation={startSimulation}
              resetSingleSimulation={resetSingleSimulation}
              simulationCount={simulationCount}
              setSimulationCount={setSimulationCount}
              startBatchSimulation={startBatchSimulation}
              resetMultipleSimulations={resetMultipleSimulations}
          />
          <CanvasMap canvasRef={canvasRef} handleMapClick={handleMapClick} />
        </div>

        <SimulationResultsModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            impactInfo={impactInfo}
            impactDirection={impactDirection}
        />

        <BatchSimulationResultsModal
            isOpen={isBatchModalOpen}
            onRequestClose={closeBatchModal}
            simulationResults={simulationResults}
            materials={materials}
            prepareChartData={() => prepareChartData(simulationResults, materials)}
        />

        <ErrorModal
            isOpen={isErrorModalOpen}
            onRequestClose={() => setIsErrorModalOpen(false)}
            missingFields={missingFields}
        />
      </div>
  );
};

export default App;
