import { useState } from "react";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {

  return (
    <nav className="main-nav">
      <button 
        className={`nav-btn ${activeTab === 'health' ? 'active' : ''}`}
        onClick={() => setActiveTab('health')}
      >
        <span className="nav-icon">❤️</span>
        Здоровье
      </button>
      <button 
        className={`nav-btn ${activeTab === 'community' ? 'active' : ''}`}
        onClick={() => setActiveTab('community')}
      >
        <span className="nav-icon">👥</span>
        Сообщество
      </button>
      <button 
        className={`nav-btn ${activeTab === 'learning' ? 'active' : ''}`}
        onClick={() => setActiveTab('learning')}
      >
        <span className="nav-icon">📚</span>
        Обучение
      </button>
      <button 
        className={`nav-btn ${activeTab === 'eco' ? 'active' : ''}`}
        onClick={() => setActiveTab('eco')}
      >
        <span className="nav-icon">🌍</span>
        Эко-жизнь
      </button>
    </nav>
  );
};

export default NavigationTabs;