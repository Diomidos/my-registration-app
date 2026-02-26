import { useState } from "react";

const Eco: React.FC = () => {
  const [activeTab, setActiveTab] = useState('eco'); 

  return (
    <>
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
    </>
  );
};

export default Eco;