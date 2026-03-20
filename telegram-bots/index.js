/**
 * Запуск всех 4 Telegram ботов YATAPP
 * Каждый бот работает как отдельный процесс (через child_process)
 */
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bots = [
  'client-bot.js',
  'courier-bot.js',
  'restaurant-bot.js',
  'courier-company-bot.js',
];

console.log('🚀 Запуск всех Telegram ботов YATAPP...\n');

bots.forEach((botFile) => {
  const botPath = join(__dirname, 'bots', botFile);
  const child = spawn('node', [botPath], {
    stdio: 'inherit',
    cwd: __dirname,
  });

  child.on('error', (err) => {
    console.error(`❌ Ошибка запуска ${botFile}:`, err);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`⚠️ ${botFile} завершился с кодом ${code}`);
    }
  });
});
