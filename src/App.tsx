import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import './App.css';

// 1. Data Definitions
interface FurnitureItem {
  id: string;
  label: string;
  videoSrc: string;
}

const MATERIALS = [
  { id: 'wood', label: 'Wood' },
  { id: 'marble', label: 'Marble' },
  { id: 'metal', label: 'Metal' },
  { id: 'fabric', label: 'Fabric' },
  { id: 'glass', label: 'Glass' },
  { id: 'leather', label: 'Leather' },
];

const FURNITURE_LIST: FurnitureItem[] = [
  { id: 'sofa', label: 'Sofa', videoSrc: '/videos/sofa.mp4' },
  { id: 'table', label: 'Coffee Table', videoSrc: '/videos/table.mp4' },
  { id: 'armchair', label: 'Armchair', videoSrc: '/videos/armchair.mp4' },
  { id: 'lamp', label: 'Floor Lamp', videoSrc: '/videos/lamp.mp4' },
];

function App() {
  const [lightIntensity, setLightIntensity] = useState<number>(75);
  const [colorTemp, setColorTemp] = useState<number>(4500);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('fabric');
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem>(FURNITURE_LIST[0]);

  const handleFurnitureChange = (item: FurnitureItem) => {
    setSelectedFurniture(item);
    if (item.id === 'armchair') setSelectedMaterial('fabric');
    else if (item.id === 'sofa') setSelectedMaterial('fabric');
    else if (item.id === 'table') setSelectedMaterial('marble');
  };

  const handleRender = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = `DesignArena-${selectedFurniture.id}.png`;
      link.href = image;
      link.click();
    }
  };

  return (
    <div className="app-wrapper">
      <aside className="architect-sidebar">
        <div className="brand-header">
          <div className="brand-icon">🏛️</div>
          <h1>Interior Design Architect</h1>
        </div>

        {/* LIGHTING */}
        <div className="config-card">
          <div className="card-header">
            <span>🔆</span> <h2>LIGHTING</h2>
          </div>
          <div className="input-group">
            <div className="label-row">
              <span>Light Intensity</span>
              <span className="value">{lightIntensity}%</span>
            </div>
            <input type="range" min="0" max="100" value={lightIntensity} onChange={(e) => setLightIntensity(Number(e.target.value))} />
          </div>
          <div className="input-group">
            <div className="label-row">
              <span>Color temperature</span>
              <span className="value">{colorTemp}K</span>
            </div>
            <input type="range" min="2000" max="8000" value={colorTemp} onChange={(e) => setColorTemp(Number(e.target.value))} />
          </div>
        </div>

        {/* MATERIALS - All 6 kept */}
        <div className="config-card">
          <div className="card-header">
            <span>🎨</span> <h2>MATERIALS</h2>
          </div>
          <div className="materials-grid">
            {MATERIALS.map((m) => (
              <button
                key={m.id}
                className={`material-btn ${selectedMaterial === m.id ? 'active' : ''}`}
                onClick={() => setSelectedMaterial(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* COLLECTION */}
        <div className="config-card">
          <div className="card-header">
            <span>🛋️</span> <h2>FURNITURE</h2>
          </div>
          <div className="furniture-stack">
            {FURNITURE_LIST.map((item) => (
              <button
                key={item.id}
                className={`furniture-btn ${selectedFurniture.id === item.id ? 'active' : ''}`}
                onClick={() => handleFurnitureChange(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="viewer-area">
        <header className="viewer-navbar">
          <h2>Room Preview</h2>
          <div className="navbar-actions">
            <button className="btn-secondary" onClick={handleRender}>Export</button>
            <button className="btn-primary" onClick={handleRender}>Render</button>
          </div>
        </header>

        <div className="main-canvas-frame" style={{ filter: `brightness(${0.4 + lightIntensity / 100})` }}>
          <div className="canvas-badge">
             Light Intensity: {lightIntensity}%
          </div>
          <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 0, 4], fov: 45 }}>
            <Experience videoSrc={selectedFurniture.videoSrc} lightIntensity={lightIntensity / 100} />
          </Canvas>
        </div>
      </main>
    </div>
  );
}

export default App;