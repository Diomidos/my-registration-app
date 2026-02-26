import { useState } from "react";

const Health: React.FC = () => {
  const [activeTab, setActiveTab] = useState('health');

  return (
    <main className="home-main">
      <div className="content-wrapper">
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
      </div>
    </main>
  );
};

export default Health;