/**
 * Скрипт для настройки кнопок меню у всех ботов
 * Запускается один раз при первом развёртывании
 */
import TelegramBot from 'node-telegram-bot-api';
import config from '../config.js';

async function setupBot(botConfig, name) {
  try {
    const bot = new TelegramBot(botConfig.token);
    await bot.setChatMenuButton({
      menu_button: {
        type: 'web_app',
        text: botConfig.menuButtonText,
        web_app: { url: botConfig.webAppUrl },
      },
    });
    console.log(`✅ ${name}: кнопка меню настроена`);
  } catch (err) {
    console.error(`❌ ${name}:`, err.message);
  }
}

async function main() {
  console.log('🔧 Настройка кнопок меню для всех ботов...\n');

  await setupBot(config.clientBot, 'Клиент');
  await setupBot(config.courierBot, 'Курьер');
  await setupBot(config.restaurantBot, 'Ресторан');
  await setupBot(config.courierCompanyBot, 'Курьерская компания');

  console.log('\n✨ Готово!');
  process.exit(0);
}

main();
