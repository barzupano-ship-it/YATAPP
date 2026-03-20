/**
 * Конфигурация Telegram ботов YATAPP
 * 
 * Каждый бот открывает соответствующее мини-приложение (Web App)
 * URL приложений нужно заменить на ваши продакшн адреса после деплоя
 */
import 'dotenv/config';

export default {
  // 1. Приложение клиента (Render: yatapp-client)
  clientBot: {
    token: process.env.TELEGRAM_CLIENT_BOT_TOKEN || '8612913566:AAEjG4n7t4ggd-tbL7cWe3kV7q4i-lwzWBw',
    name: 'Приложения клиента',
    webAppUrl: process.env.CLIENT_APP_URL || 'https://yatapp-client.onrender.com',
    menuButtonText: '🍔 Заказать еду',
  },

  // 2. Приложение курьера (Render: yatapp-courier-app)
  courierBot: {
    token: process.env.TELEGRAM_COURIER_BOT_TOKEN || '8781566517:AAEnnDa1ReJO5IzfgGWdRVu8Mr4ZPJB7UWs',
    name: 'Приложения курьера',
    webAppUrl: process.env.COURIER_APP_URL || 'https://yatapp-courier-app.onrender.com',
    menuButtonText: '🚴 Приложение курьера',
  },

  // 3. Web-панель владельцев ресторанов (Render: yatapp-restaurant-dashboard)
  restaurantBot: {
    token: process.env.TELEGRAM_RESTAURANT_BOT_TOKEN || '8684393324:AAF3jdeWF0DCcWwK7cnppL7ZvHIypxtSxEw',
    name: 'Панель ресторанов',
    webAppUrl: process.env.RESTAURANT_PANEL_URL || 'https://yatapp-restaurant-dashboard.onrender.com',
    menuButtonText: '🏪 Панель ресторана',
  },

  // 4. Web-панель курьерских компаний (Render: yatapp-courier-panel)
  courierCompanyBot: {
    token: process.env.TELEGRAM_COURIER_COMPANY_BOT_TOKEN || '8573966538:AAGZVUIuORhJQ1ZpHP3I4eVsGp6Y4xx2m-Q',
    name: 'Панель курьерских компаний',
    webAppUrl: process.env.COURIER_COMPANY_PANEL_URL || 'https://yatapp-courier-panel.onrender.com',
    menuButtonText: '🚚 Панель компании',
  },
};
