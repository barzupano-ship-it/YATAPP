# Telegram боты YATAPP

Интеграция приложений YATAPP в Telegram как мини-программ (Web Apps).

## Структура ботов

| Бот | Назначение | Приложение |
|-----|------------|------------|
| **Клиент** | Заказ еды | YATAPPAI (Expo Web) |
| **Курьер** | Доставка заказов | DELIVERY (Expo Web) |
| **Ресторан** | Управление рестораном | restaurant-dashboard |
| **Курьерская компания** | Управление компанией | courier-company-dashboard |

## API токены ботов

- Клиент: `8612913566:AAEjG4n7t4ggd-tbL7cWe3kV7q4i-lwzWBw`
- Курьер: `8781566517:AAEnnDa1ReJO5IzfgGWdRVu8Mr4ZPJB7UWs`
- Ресторан: `8684393324:AAF3jdeWF0DCcWwK7cnppL7ZvHIypxtSxEw`
- Курьерская компания: `8573966538:AAGZVUIuORhJQ1ZpHP3I4eVsGp6Y4xx2m-Q`

## Установка

```bash
cd telegram-bots
npm install
```

## Настройка URL приложений

**Продакшен (Render):** URL уже настроены в `config.js`:
- Клиент → `https://yatapp-client.onrender.com`
- Курьер → `https://yatapp-courier-app.onrender.com`
- Ресторан → `https://yatapp-restaurant-dashboard.onrender.com`
- Курьерская компания → `https://yatapp-courier-panel.onrender.com`

Для локальной разработки скопируйте `.env.example` в `.env` и укажите ngrok URL.

## Запуск

```bash
# Все боты одновременно
npm start

# Отдельные боты
npm run start:client
npm run start:courier
npm run start:restaurant
npm run start:courier-company

# Настройка кнопок меню (один раз)
npm run setup
```

## Для разработки

При локальной разработке используйте туннель (ngrok, Cloudflare Tunnel) для URL:

```bash
# YATAPPAI
cd YATAPPAI && npm run start:tunnel

# DELIVERY
cd DELIVERY && npm run start:tunnel

# Панели
cd restaurant-dashboard && npm run dev
cd courier-company-dashboard && npm run dev
```

Затем укажите туннель URL в `config.js` или `.env`.

## Деплой

Для продакшена рекомендуется:
- **PM2** — для запуска ботов как сервисов
- **Webhook** вместо polling — для production (требует HTTPS)

## Мини-приложения не открываются на телефоне

Если при нажатии кнопки в боте приложение не открывается или показывает пустой экран:

1. **Обновите Telegram** до последней версии (App Store / Google Play).

2. **Telegram Web App SDK** — добавлен во все приложения (restaurant-dashboard, courier-company-dashboard, YATAPPAI, DELIVERY). Пересоберите и задеплойте после изменений.

3. **HTTPS обязателен** — Telegram не открывает http:// или localhost. Для локальной разработки используйте ngrok:
   ```bash
   ngrok http 3003   # restaurant-dashboard
   ngrok http 3005   # courier-company-dashboard
   ngrok http 8081   # YATAPPAI (expo web)
   ngrok http 8081   # DELIVERY (expo web)
   ```
   Укажите `https://xxx.ngrok-free.app` в `.env`.

4. **Проверьте URL** — откройте URL в обычном браузере на телефоне. Если страница не загружается, Telegram тоже не откроет.

5. **Деплой** — панели (restaurant, courier-company) должны быть задеплоены на Render. YATAPPAI и DELIVERY — задеплойте на Vercel, Expo Hosting или другом хостинге с HTTPS.

## Устранение 404 «Page Not Found»

Если при открытии мини-приложения из Telegram появляется 404:

1. **Проверьте URL в config.js или .env** — должны быть корневые адреса без путей:
   - ✅ `https://yatapp-restaurant-dashboard.onrender.com`
   - ❌ `https://.../restaurant` (путь `/restaurant` не существует)

2. **Уточните URL в Render Dashboard** — в Render URL может отличаться (другой subdomain). Скопируйте точный URL сервиса.

3. **Render Free Tier** — сервисы «засыпают» после ~15 мин. Первая загрузка может занимать 30–60 сек. Подождите и обновите страницу.

4. **Локальная разработка** — Telegram требует HTTPS. Используйте ngrok:
   ```bash
   ngrok http 3003   # для restaurant-dashboard
   ngrok http 3005   # для courier-company-dashboard
   ```
   Укажите полученный `https://xxx.ngrok.io` в `CLIENT_APP_URL` / `RESTAURANT_PANEL_URL` и т.д.

5. **Перезапустите ботов** после изменения URL в config:
   ```bash
   npm run setup   # обновить кнопки меню
   ```

## Безопасность

⚠️ **Важно:** Не храните API токены в репозитории. Используйте переменные окружения:
- Создайте `.env` (есть в .gitignore)
- Или настройте в среде деплоя (Railway, Render, VPS)
