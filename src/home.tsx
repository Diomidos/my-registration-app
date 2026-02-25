// home.tsx
import React, { useState } from 'react';
import './home.css';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('health');

  return (
    <div className="home-container">
      {/* Header с новым слоганом */}
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
        
        {/* Навигация по разделам */}
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
      </header>

      {/* Main Content - динамически меняется в зависимости от выбранного раздела */}
      <main className="home-main">
        <div className="content-wrapper">
          {/* Раздел Здоровье (HealthTracker) */}
          {activeTab === 'health' && (
            <section className="health-section">
              <h2>Трекер здоровья и баланса</h2>
              <div className="health-stats">
                <div className="stat-card">
                  <div className="stat-icon">😊</div>
                  <h3>Уровень стресса</h3>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '45%'}}>45%</div>
                  </div>
                  <p className="stat-tip">Попробуйте медитацию 5 минут</p>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">💤</div>
                  <h3>Качество сна</h3>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '78%'}}>78%</div>
                  </div>
                  <p className="stat-tip">Отличный результат!</p>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">📱</div>
                  <h3>Экранное время</h3>
                  <div className="progress-bar">
                    <div className="progress warning" style={{width: '82%'}}>8.2 ч</div>
                  </div>
                  <p className="stat-tip">Рекомендуем снизить до 6 ч</p>
                </div>
              </div>

              <div className="balance-tip">
                <h3>🌿 Совет дня для цифрового баланса:</h3>
                <p>Сделайте 15-минутный перерыв от экранов каждый час. Ваши глаза и мозг скажут спасибо!</p>
              </div>

              <form className="health-form">
                <h3>Как вы себя чувствуете сегодня?</h3>
                <div className="mood-selector">
                  {['😊 Отлично', '😐 Нормально', '😫 Устал', '😤 Стресс'].map(mood => (
                    <label key={mood} className="mood-option">
                      <input type="radio" name="mood" />
                      <span>{mood}</span>
                    </label>
                  ))}
                </div>
                <button type="submit" className="submit-btn">Сохранить</button>
              </form>
            </section>
          )}

          {/* Раздел Сообщество (CommunityHub) */}
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

          {/* Раздел Обучение (LearningCenter) */}
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

          {/* Раздел Эко-жизнь (EcoCalculator) */}
          {activeTab === 'eco' && (
            <section className="eco-section">
              <h2>Калькулятор углеродного следа</h2>
              <form className="eco-form">
                <div className="form-group">
                  <label>🚗 Автомобиль (км в день)</label>
                  <input type="number" placeholder="Например: 20" />
                </div>
                
                <div className="form-group">
                  <label>💡 Электричество (кВт/ч в день)</label>
                  <input type="number" placeholder="Например: 10" />
                </div>
                
                <div className="form-group">
                  <label>✈️ Перелеты (часов в год)</label>
                  <input type="number" placeholder="Например: 50" />
                </div>
                
                <button type="submit" className="submit-btn">Рассчитать</button>
              </form>
              
              <div className="eco-tips">
                <h3>🌱 Эко-совет дня:</h3>
                <p>Используйте многоразовую бутылку для воды - это спасает до 150 пластиковых бутылок в год!</p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/icons8-dance.gif" alt="Diomidos Life" />
            <span>Diomidos Life</span>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>О нас</h4>
              <a href="/about">Миссия</a>
              <a href="/team">Команда</a>
              <a href="/careers">Карьера</a>
            </div>
            
            <div className="footer-column">
              <h4>Поддержка</h4>
              <a href="/help">Помощь</a>
              <a href="/contact">Контакты</a>
              <a href="/faq">FAQ</a>
            </div>
            
            <div className="footer-column">
              <h4>Правовая</h4>
              <a href="/privacy">Конфиденциальность</a>
              <a href="/terms">Условия</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2026 Diomidos Life. Все права защищены.</p>
            <p className="footer-motto">Твой путь к лучшей версии себя</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;