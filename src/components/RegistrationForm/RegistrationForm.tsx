import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Установите: npm install axios
import './RegistrationForm.css';

// Определяем интерфейс для данных формы
interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

// Определяем интерфейс для ошибок валидации
interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  general?: string; // для общих ошибок сервера
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  
  // Состояние для данных формы
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Состояние для ошибок
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Состояние для загрузки (чтобы блокировать кнопку при отправке)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Состояние для сообщения об успехе
  const [successMessage, setSuccessMessage] = useState<string>('');

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
    // Очищаем общую ошибку при изменении любого поля
    if (errors.general) {
      setErrors({
        ...errors,
        general: undefined,
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
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log('В форме есть ошибки:', errors);
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    
    try {
      // Отправляем данные на сервер
      // Если вы настроили proxy в package.json, можно использовать относительный путь
      const response = await axios.post('http://localhost:5000/api/register', {
        username: formData.username,
        password: formData.password
        // confirmPassword не отправляем на сервер, он нужен только для валидации
      });

      console.log('Ответ сервера:', response.data);
      
      // Показываем сообщение об успехе
      setSuccessMessage('Регистрация прошла успешно! Перенаправляем...');
      
      // Сброс формы
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
      });
      
      // Перенаправляем на страницу home через 2 секунды
      setTimeout(() => {
        navigate('/home');
      }, 2000);
      
    } catch (error: any) {
      console.error('Ошибка при регистрации:', error);
      
      // Обрабатываем ошибку от сервера
      if (error.response) {
        // Сервер вернул ошибку
        setErrors({
          general: error.response.data.message || 'Ошибка при регистрации на сервере'
        });
      } else if (error.request) {
        // Запрос был отправлен, но нет ответа
        setErrors({
          general: 'Сервер не отвечает. Проверьте, запущен ли сервер (npm start в папке server)'
        });
      } else {
        // Ошибка при настройке запроса
        setErrors({
          general: 'Ошибка при отправке запроса'
        });
      }
    } finally {
      setIsLoading(false);
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
      
      {/* Сообщение об успехе */}
      {successMessage && (
        <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>
          {successMessage}
        </div>
      )}
      
      {/* Общая ошибка (например, сервер не отвечает) */}
      {errors.general && (
        <div className="error-message general-error" style={{ color: 'red', marginBottom: '15px' }}>
          {errors.general}
        </div>
      )}
      
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Отправка...' : 'Зарегистрироваться'}
        </button>

        <p className="form-note">
          Поля, отмеченные *, обязательны для заполнения
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;