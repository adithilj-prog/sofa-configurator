import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import './index.css';

// 1. Define types for better IntelliSense and error catching
interface FurnitureItem {
  id: string;
  label: string;
  videoSrc: string;
}

interface MaterialItem {
  id: string;
  label: string;
}

const MATERIALS: MaterialItem[] = [
  { id: 'plum-velvet', label: 'Plum Velvet' },
  { id: 'nero-marquina', label: 'Nero Marquina' },
  { id: 'sage-green', label: 'Sage Green' },
  { id: 'gold-leaf', label: 'Gold Leaf' },
];

const FURNITURE_LIST: FurnitureItem[] = [
  { id: 'sofa', label: 'Sofa', videoSrc: '/videos/sofa.mp4' },
  { id: 'table', label: 'Coffee Table', videoSrc: '/videos/table.mp4' },
  { id: 'armchair', label: 'Armchair', videoSrc: '/videos/armchair.mp4' },
  { id: 'lamp', label: 'Floor Lamp', videoSrc: '/videos/lamp.mp4' },
];

function App() {
  const [lightIntensity, setLightIntensity] = useState<number>(75);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('plum-velvet');
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem>(FURNITURE_LIST[0]);

  // Logic to handle furniture change AND auto-select matching material
  const handleFurnitureChange = (item: FurnitureItem) => {
    setSelectedFurniture(item);
    
    if (item.id === 'armchair') {
      setSelectedMaterial('sage-green');
    } else if (item.id === 'sofa') {
      setSelectedMaterial('plum-velvet');
    } else if (item.id === 'table') {
      setSelectedMaterial('nero-marquina');
    } else if (item.id === 'lamp') {
      setSelectedMaterial('gold-leaf');
    }
  };

  // Handle the screenshot capture
  const handleRender = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = `${selectedFurniture.id}-design.png`;
      link.href = image;
      link.click();
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>DesignArena</h1>
          <p className="subtitle">3D Architectural Configurator</p>
        </div>

        {/* Lighting Control */}
        <div className="settings-section">
          <h2>Lighting</h2>
          <div className="control-group">
            <div className="control-label">
              <span>Intensity</span>
              <span className="control-value">{lightIntensity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(Number(e.target.value))}
              className="custom-slider"
            />
          </div>
        </div>

        {/* Materials Grid */}
        <div className="settings-section">
          <h2>Materials</h2>
          <div className="material-grid">
            {MATERIALS.map((m) => (
              <button
                key={m.id}
                className={`material-item ${selectedMaterial === m.id ? 'active' : ''}`}
                onClick={() => setSelectedMaterial(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Furniture Selection */}
        <div className="settings-section">
          <h2>Collection</h2>
          <div className="furniture-list">
            {FURNITURE_LIST.map((item) => (
              <button
                key={item.id}
                className={`furniture-item ${selectedFurniture.id === item.id ? 'active' : ''}`}
                onClick={() => handleFurnitureChange(item)} // Updated: Uses logic handler
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button className="render-btn" onClick={handleRender}>
          Export Render (PNG)
        </button>
      </aside>

      <main className="main-content">
        <div 
          className="canvas-viewport" 
          style={{ 
            filter: `brightness(${lightIntensity / 100})`, 
            transition: 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
        >
          <Canvas shadows gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 0, 4], fov: 45 }}>
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