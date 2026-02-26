import { useState } from "react";

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('community'); 

  return (
    <div className="community-container">
      {activeTab === 'community' && (
        <section className="community-section">
          <h2>Сообщество единомышленников</h2>
          <div className="community-grid">
            <div className="community-card">
              <h3>🌅 Утренняя практика</h3>
              <p>Начни день с зарядки вместе с нами</p>
              <div className="participants">Участников: 234</div>
              <button className="join-btn">Присоединиться</button>
            </div>
            
            <div className="community-card">
              <h3>📵 Цифровой детокс</h3>
              <p>24 часа без экранов</p>
              <div className="participants">Участников: 156</div>
              <button className="join-btn">Присоединиться</button>
            </div>
            
            <div className="community-card">
              <h3>🧘 Медитация</h3>
              <p>Групповые сессии каждый вечер</p>
              <div className="participants">Участников: 189</div>
              <button className="join-btn">Присоединиться</button>
            </div>
          </div>

          <div className="chat-preview">
            <h3>Последние сообщения в чате:</h3>
            <div className="chat-messages">
              <p><strong>Анна:</strong> Сегодня чувствую себя намного лучше после детокса!</p>
              <p><strong>Михаил:</strong> Кто завтра на утреннюю йогу?</p>
              <p><strong>Елена:</strong> Открыла для себя отличную практику осознанности</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Community;