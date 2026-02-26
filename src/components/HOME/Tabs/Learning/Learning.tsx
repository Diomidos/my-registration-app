import { useState } from "react";

const Learning: React.FC = () => {
  const [activeTab, setActiveTab] = useState('learning'); 

  return (
    <>
      {activeTab === 'learning' && ( 
        <section className="learning-section"> 
          <h2>Центр обучения</h2>
          <div className="courses-grid">
            <div className="course-card">
              <span className="course-badge">Новый</span>
              <h3>Основы цифровой гигиены</h3>
              <p>Как не выгорать в онлайне</p>
              <div className="course-meta">⏱️ 3 часа • 📊 Начальный</div>
              <button className="start-btn">Начать</button>
            </div>
            
            <div className="course-card">
              <h3>Медитация для начинающих</h3>
              <p>10 минут в день для спокойствия</p>
              <div className="course-meta">⏱️ 2 часа • 🧘 Практика</div>
              <button className="start-btn">Начать</button>
            </div>
            
            <div className="course-card">
              <h3>Экологичный образ жизни</h3>
              <p>Маленькие шаги для большой планеты</p>
              <div className="course-meta">⏱️ 4 часа • 🌍 Для всех</div>
              <button className="start-btn">Начать</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Learning;