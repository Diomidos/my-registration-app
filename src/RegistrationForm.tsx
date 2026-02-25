import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Добавляем импорт
import './RegistrationForm.css';

// Определяем интерфейс для данных формы
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Определяем интерфейс для ошибок валидации
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate(); // Хук для навигации
  
  // Состояние для данных формы
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Состояние для ошибок
  const [errors, setErrors] = useState<FormErrors>({});

  // Обработка изменения значений в полях ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Очищаем ошибку при начале редактирования поля
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Функция валидации формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Здесь обычно отправка данных на сервер
      console.log('Форма отправлена:', formData);
      
      // Перенаправляем на страницу home после успешной регистрации
      navigate('/home');
      
      // Сброс формы (опционально)
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      console.log('В форме есть ошибки:', errors);
    }
  };

  return (
    <div className="registration-container">
      <h2>
        <img 
          src="/icon-touch-id.svg" 
          alt="touch id" 
          className="registration-icon"
        />
        Регистрация
      </h2>
      <form onSubmit={handleSubmit} className="registration-form" noValidate>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Имя пользователя
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`form-input ${errors.username ? 'input-error' : ''}`}
            placeholder="Введите ваше имя"
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            placeholder="Не менее 6 символов"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Подтверждение пароля
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
            placeholder="Повторите пароль"
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Зарегистрироваться
        </button>

        <p className="form-note">
          Поля, отмеченные *, обязательны для заполнения
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;