import { useState } from 'react';
import './index.css';
import { Canvas } from '@react-three/fiber';
// If Experience is now .tsx, this import will work perfectly
import Experience from './Experience'; 

function App() {
  const [lightIntensity, setLightIntensity] = useState(75);
  const [selectedMaterial, setSelectedMaterial] = useState('wood');
  const [selectedFurniture, setSelectedFurniture] = useState('sofa');

  const materials = [
    { id: 'wood', label: 'Wood' },
    { id: 'marble', label: 'Marble' },
    { id: 'metal', label: 'Metal' },
    { id: 'fabric', label: 'Fabric' },
    { id: 'glass', label: 'Glass' },
    { id: 'leather', label: 'Leather' },
  ];

  const furniture = [
    { id: 'sofa', label: 'Sofa', icon: 'sofa' },
    { id: 'table', label: 'Coffee Table', icon: 'table' },
    { id: 'chair', label: 'Armchair', icon: 'chair' },
    { id: 'lamp', label: 'Floor Lamp', icon: 'lamp' },
  ];

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          {/* Logo SVG */}
          <h1>Interior Design Architect</h1>
        </div>

        {/* Lighting Section */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Lighting</h2>
          </div>
          <div className="control-group">
            <div className="control-label">
              <span>Light Intensity</span>
              <span className="control-value">{lightIntensity}%</span>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Materials Section - Fixing the "Unused" Warning */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Materials</h2>
          </div>
          <div className="material-grid">
            {materials.map((m) => (
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

        {/* Furniture Section */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Furniture</h2>
          </div>
          <div className="furniture-list">
            {furniture.map((item) => (
              <button
                key={item.id}
                className={`furniture-item ${selectedFurniture === item.id ? 'active' : ''}`}
                onClick={() => setSelectedFurniture(item.id)}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="video-container" style={{ position: 'relative', height: '500px', background: '#1a1a1a' }}>
          <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
            <Experience 
              selectedFurniture={selectedFurniture} 
              lightIntensity={lightIntensity} 
            />
          </Canvas>
        </div>
      </main>
    </div>
  );
}

export default App;