/**
 * Бот Web-панели владельцев ресторанов
 * Открывает restaurant-dashboard как Telegram Mini App
 */
import TelegramBot from 'node-telegram-bot-api';
import config from '../config.js';

const { token, webAppUrl, menuButtonText } = config.restaurantBot;
const bot = new TelegramBot(token, { polling: true });

// Установка кнопки меню для открытия Web App
bot.setChatMenuButton({ menu_button: { type: 'web_app', text: menuButtonText, web_app: { url: webAppUrl } } });

// Обработка /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `🏪 Добро пожаловать в панель управления рестораном YATAPP!\n\nНажмите кнопку ниже, чтобы открыть панель:`, {
    reply_markup: {
      inline_keyboard: [[
        { text: menuButtonText, web_app: { url: webAppUrl } }
      ]]
    }
  });
});

console.log('✅ Бот панели ресторанов запущен');
