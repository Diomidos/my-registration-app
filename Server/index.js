const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // разрешаем запросы с React
    credentials: true
}));

// ВАЖНО: этот middleware должен быть перед маршрутами!
app.use(express.json()); // для парсинга JSON
app.use(express.urlencoded({ extended: true })); // для парсинга form data

// Обработка регистрации
app.post('/api/register', (req, res) => {
    console.log('📥 Получен запрос на регистрацию');
    console.log('📦 Тело запроса:', req.body);
    console.log('📦 Заголовки:', req.headers['content-type']);
    
    const { username, password } = req.body;
    
    // Проверка, что данные пришли
    if (!username || !password) {
        console.log('❌ Отсутствуют обязательные поля');
        return res.status(400).json({ 
            message: 'Имя пользователя и пароль обязательны',
            received: req.body
        });
    }
    
    try {
        // логика сохранения в базу данных
        console.log(`✅ Успешная регистрация: ${username}`);
        
        // Отправляем успешный ответ
        res.status(201).json({ 
            success: true,
            message: 'Пользователь успешно зарегистрирован',
            user: { 
                username,
                // НЕ отправляем пароль обратно!
                id: Date.now() 
            }
        });
    } catch (error) {
        console.error('❌ Ошибка при регистрации:', error);
        res.status(500).json({ 
            message: 'Внутренняя ошибка сервера',
            error: error.message 
        });
    }
});

// Тестовый маршрут для проверки
app.get('/api/test', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

// Обработка 404
app.use((req, res) => {
    res.status(404).json({ message: 'Маршрут не найден' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Тестовый эндпоинт: http://localhost:${PORT}/api/test`);
    console.log(`Регистрация: http://localhost:${PORT}/api/register`);
});