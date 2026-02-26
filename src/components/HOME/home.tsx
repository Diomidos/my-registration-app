import React, { useState } from 'react';
import './home.css';
import Health from './Tabs/Health/Health';
import Community from './Tabs/Community/Community';
import Learning from './Tabs/Learning/Learning';
import Eco from './Tabs/Eco/Eco';
import NavigationTabs from './Tabs/NavigationTabs';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('health');

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <img 
            src="/icons8-dance.gif" 
            alt='Diomidos Life'
            className="header-icon"
          />
          <div className="header-title">
            <h1>Diomidos Life</h1>
            <p className="header-slogan">Твой путь к лучшей версии себя</p>
          </div>
        </div>
        
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>

      <main className="home-main">
        <div className="content-wrapper">
          {activeTab === 'health' && <Health />}
          {activeTab === 'community' && <Community />}
          {activeTab === 'learning' && <Learning />}
          {activeTab === 'eco' && <Eco />}
        </div>
      </main>
      <footer className="home-footer">
        {/* ... */}
      </footer>
    </div>
  );
};

export default Home;