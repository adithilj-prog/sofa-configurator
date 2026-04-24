import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import './App.css';

interface FurnitureItem {
  id: string;
  label: string;
  videoSrc: string;
  materialLabel: string;
}

const FURNITURE_LIST: FurnitureItem[] = [
  { id: 'sofa', label: 'Sofa', videoSrc: '/videos/sofa.mp4', materialLabel: 'Plum Velvet' },
  { id: 'table', label: 'Coffee Table', videoSrc: '/videos/table.mp4', materialLabel: 'Nero Marquina' },
  { id: 'armchair', label: 'Armchair', videoSrc: '/videos/armchair.mp4', materialLabel: 'Sage Green' },
  { id: 'lamp', label: 'Floor Lamp', videoSrc: '/videos/lamp.mp4', materialLabel: 'Gold Leaf' },
];

function App() {
  const [lightIntensity, setLightIntensity] = useState<number>(75);
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem>(FURNITURE_LIST[0]);

  const handleGenerateRender = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = `DesignArena-Render-${selectedFurniture.id}.png`;
      link.href = image;
      link.click();
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 style={{color: 'var(--gold)', fontSize: '22px'}}>DesignArena</h1>
          <p style={{fontSize: '11px', color: 'var(--text-muted)'}}>3D Architectural Configurator</p>
        </div>

        <div className="settings-section">
          <h2>Lighting</h2>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
            <span style={{fontSize: '13px'}}>Intensity</span>
            <span style={{color: 'var(--gold)'}}>{lightIntensity}%</span>
          </div>
          <input 
            type="range" min="30" max="150" 
            value={lightIntensity} 
            onChange={(e) => setLightIntensity(Number(e.target.value))}
            style={{width: '100%', accentColor: 'var(--gold)'}}
          />
        </div>

        <div className="settings-section">
          <h2>Current Finish</h2>
          <div className="material-status-badge">
            <span>🎨</span>
            {selectedFurniture.materialLabel}
          </div>
        </div>

        <div className="settings-section">
          <h2>Collection</h2>
          {FURNITURE_LIST.map((item) => (
            <button
              key={item.id}
              className={`furniture-item ${selectedFurniture.id === item.id ? 'active' : ''}`}
              onClick={() => setSelectedFurniture(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <main style={{flex: 1, display: 'flex', flexDirection: 'column', padding: '24px'}}>
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2 style={{fontSize: '24px'}}>Room Preview</h2>
          <button className="primary-action-btn" onClick={handleGenerateRender}>
            Generate Render (PNG)
          </button>
        </header>

        <div style={{
          flex: 1, 
          background: '#000', 
          borderRadius: '20px', 
          overflow: 'hidden', 
          position: 'relative',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          filter: `brightness(${0.5 + lightIntensity / 100})`
        }}>
           <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <Experience 
              videoSrc={selectedFurniture.videoSrc} 
              lightIntensity={lightIntensity / 100} 
            />
          </Canvas>
        </div>
      </main>
    </div>
  );
}

export default App;