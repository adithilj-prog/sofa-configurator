import { useState } from 'react';
import './index.css';

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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <h1>Interior Design Architect</h1>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
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
                aria-label="Light intensity"
              />
            </div>
          </div>
          <div className="control-group">
            <div className="control-label">
              <span>Color Temperature</span>
              <span className="control-value">4500K</span>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min="2700"
                max="6500"
                defaultValue="4500"
                aria-label="Color temperature"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            <h2>Materials</h2>
          </div>
          <div className="material-grid">
            {materials.map((material) => (
              <button
                key={material.id}
                className={`material-item ${selectedMaterial === material.id ? 'active' : ''}`}
                onClick={() => setSelectedMaterial(material.id)}
              >
                {material.label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
              <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
              <path d="M4 18v2" />
              <path d="M20 18v2" />
            </svg>
            <h2>Furniture</h2>
          </div>
          <div className="furniture-list">
            {furniture.map((item) => (
              <button
                key={item.id}
                className={`furniture-item ${selectedFurniture === item.id ? 'active' : ''}`}
                onClick={() => setSelectedFurniture(item.id)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {item.icon === 'sofa' && (
                    <>
                      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
                      <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
                    </>
                  )}
                  {item.icon === 'table' && (
                    <>
                      <rect x="2" y="7" width="20" height="3" rx="1" />
                      <line x1="5" y1="10" x2="5" y2="19" />
                      <line x1="19" y1="10" x2="19" y2="19" />
                    </>
                  )}
                  {item.icon === 'chair' && (
                    <>
                      <path d="M7 17V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8" />
                      <path d="M5 17h14" />
                      <path d="M7 21V17" />
                      <path d="M17 21V17" />
                    </>
                  )}
                  {item.icon === 'lamp' && (
                    <>
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <path d="M12 2v4" />
                      <path d="M12 6a6 6 0 0 1 6 6c0 3-2 6-6 6s-6-3-6-6a6 6 0 0 1 6-6z" />
                    </>
                  )}
                </svg>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

        <main className="main-content">
        <div className="preview-header">
          <h2>Room Preview</h2>
          <div className="preview-actions">
            <button className="action-btn" onClick={() => alert("Exporting High-Res Render...")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Export
            </button>
            <button className="action-btn primary" onClick={() => alert("Render Engine Initializing...")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Render
            </button>
          </div>
        </div>

        <div className="video-container" style={{ position: 'relative', overflow: 'hidden' }}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              display: 'block',
              filter: `brightness(${lightIntensity / 100 + 0.3})`
            }}
          >
            <source src="/designarena_video_p3w2nw4r.mp4" type="video/mp4" />
          </video>

          <div className="light-overlay">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
            </svg>
            <span>Light Intensity: <span className="percentage">{lightIntensity}%</span></span>
          </div>
        </div> 
      </main>
    </div>
  );
}

export default App;