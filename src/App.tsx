import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/HOME/home';
import './App.css';

// Компонент для главной страницы с регистрацией
const RegistrationPage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Добро пожаловать на мой сайт</h1>
        <p className="App-subtitle">
          Тут вас ждёт что-то волшебное
        </p>
      </header>
      <main className="App-main">
        <RegistrationForm />
      </main>
      <footer className="App-footer">
        <p>© Diomidos. Все права защищены.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;