import React, { useState, FormEvent, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistrationForm.css';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const isSubmitting = useRef(false);
  const redirectTimeout = useRef<NodeJS.Timeout>();
  const mounted = useRef(true);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
    };
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: undefined,
      }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
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
  }, [formData]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting.current || isLoading) {
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    isSubmitting.current = true;
    setIsLoading(true);
    setSuccessMessage('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username: formData.username,
        password: formData.password
      });

      console.log('Ответ сервера:', response.data);
      
      if (mounted.current) {
        setSuccessMessage('Регистрация прошла успешно! Перенаправляем...');
        
        // Очищаем форму
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
      }
      
      // Очищаем предыдущий таймаут
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
      }
      
      if (mounted.current) {
  setSuccessMessage('Регистрация прошла успешно! Перенаправляем...');
  setFormData({
    username: '',
    password: '',
    confirmPassword: '',
  });
  setErrors({});
  isSubmitting.current = false;
  setIsLoading(false);
  navigate('/home', { replace: true });
}
      
    } catch (error: any) {
      console.error('Ошибка при регистрации:', error);
      
      if (mounted.current) {
        if (error.response) {
          setErrors({
            general: error.response.data.message || 'Ошибка при регистрации на сервере'
          });
        } else if (error.request) {
          setErrors({
            general: 'Сервер не отвечает. Проверьте, запущен ли сервер'
          });
        } else {
          setErrors({
            general: 'Ошибка при отправке запроса'
          });
        }
        
        isSubmitting.current = false;
        setIsLoading(false);
      }
    }
  }, [formData, validateForm, isLoading, navigate]);

  return (
    <div className="registration-container">
      <h2 data-testid="registration-title">
        <img 
          src="/icon-touch-id.svg" 
          alt="touch id" 
          className="registration-icon"
        />
        Регистрация
      </h2>
      
      {successMessage && (
        <div className="success-message" style={{ color: 'green', marginBottom: '15px' }}>
          {successMessage}
        </div>
      )}
      
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

export default memo(RegistrationForm);