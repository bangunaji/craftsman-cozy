import React, { useState, useEffect, useRef } from 'react';
import { GameProvider, useGame } from './game/gameState';
import { Inventory } from './components/Inventory';
import { MiningArea } from './components/MiningArea';
import { CraftingTable } from './components/CraftingTable';
import { Market } from './components/Market';
import { Workshop } from './components/Workshop';
import EndgameProgress from './components/EndgameProgress';
import { OfflineEarnings } from './components/OfflineEarnings';
import { MonsterThreat } from './components/MonsterThreat';
import { Pickaxe, Hammer, Store as MarketIcon, Factory, Award } from 'lucide-react';
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(Math.floor(currentProgress));

      if (currentProgress === 100) {
        clearInterval(interval);
        setIsFading(true);
        setTimeout(() => {
          onComplete();
        }, 600); // Wait for fade out animation
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      background: 'var(--bg-main)', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      animation: isFading ? 'fadeOut 0.6s ease-out forwards' : 'none'
    }}>
      <style>
        {`
          @keyframes popIn {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            80% { transform: scale(1.1) rotate(380deg); opacity: 1; }
            100% { transform: scale(1) rotate(360deg); opacity: 1; }
          }
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
          }
        `}
      </style>
      <div style={{ fontSize: '5rem', marginBottom: '20px', animation: 'popIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}>🏕️</div>
      <h1 style={{ color: 'var(--text-main)', fontSize: '2rem', margin: 0, fontWeight: 900, animation: 'slideUp 0.8s ease-out 0.4s both' }}>Craftsman</h1>
      <p style={{ color: 'var(--text-muted)', fontWeight: 'bold', animation: 'slideUp 0.8s ease-out 0.6s both', marginBottom: '40px' }}>Cozy Evergreen Edition</p>
      
      {/* Loading Bar Element */}
      <div style={{ width: '60%', maxWidth: '300px', opacity: isFading ? 0 : 1, transition: 'opacity 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
              <span>Memuat...</span>
              <span>{progress}%</span>
          </div>
          <div className="progress-bg" style={{ height: '12px', background: 'rgba(0,0,0,0.05)' }}>
              <div className="progress-fill" style={{ width: `${progress}%`, transition: 'width 0.2s ease-out' }}></div>
          </div>
      </div>
    </div>
  );
};

function AppContent() {
  const [activeTab, setActiveTab] = useState('mine');
  const [loading, setLoading] = useState(true);

  // Temporary force reset for v13
  useEffect(() => {
    if (!localStorage.getItem('v13_reset_flag')) {
       localStorage.removeItem('piForgeSave');
       localStorage.setItem('v13_reset_flag', 'true');
       window.location.reload();
    }
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="app-container">
      <Inventory />
      <MonsterThreat />
      
      <main className="content-area">
        {activeTab === 'mine' && <MiningArea />}
        {activeTab === 'craft' && <CraftingTable />}
        {activeTab === 'market' && <Market />}
        {activeTab === 'workshop' && <Workshop />}
        {activeTab === 'endgame' && <EndgameProgress />}
      </main>

      <nav className="bottom-nav glass-nav">
        <button className={activeTab === 'mine' ? 'active' : ''} onClick={() => setActiveTab('mine')}>
          <Pickaxe size={22} className="nav-icon" />
          <span>Explore</span>
        </button>
        <button className={activeTab === 'craft' ? 'active' : ''} onClick={() => setActiveTab('craft')}>
          <Hammer size={22} className="nav-icon" />
          <span>Craft</span>
        </button>
        <button className={activeTab === 'market' ? 'active' : ''} onClick={() => setActiveTab('market')}>
          <MarketIcon size={22} className="nav-icon" />
          <span>Market</span>
        </button>
        <button className={activeTab === 'workshop' ? 'active' : ''} onClick={() => setActiveTab('workshop')}>
          <Factory size={22} className="nav-icon" />
          <span>Workshop</span>
        </button>
        <button className={activeTab === 'endgame' ? 'active' : ''} onClick={() => setActiveTab('endgame')}>
          <Award size={22} className="nav-icon" />
          <span>Progress</span>
        </button>
      </nav>

      <OfflineEarnings />
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
