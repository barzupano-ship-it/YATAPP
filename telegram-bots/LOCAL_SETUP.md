# Быстрый запуск для локального тестирования

Если вместо приложения открывается **реклама** (Total AV и т.п.) — URL бота указывает не туда. Настройте правильные адреса.

## Шаг 1: Установите ngrok

```bash
# Windows (choco)
choco install ngrok

# Или скачайте с https://ngrok.com/download
```

Зарегистрируйтесь на ngrok.com и выполните `ngrok config add-authtoken YOUR_TOKEN`.

## Шаг 2: Запустите приложение

В **первом терминале** (для бота «Курьер» — DELIVERY):

```bash
cd DELIVERY
npm run web
```

Дождитесь сообщения вроде `Webpack compiled successfully` и порта (обычно 8081).

## Шаг 3: Запустите ngrok

Во **втором терминале**:

```bash
ngrok http 8081
```

Скопируйте URL вида `https://abc123.ngrok-free.app`.

## Шаг 4: Создайте .env

```bash
cd telegram-bots
copy .env.example .env
```

Откройте `.env` и укажите:

```
COURIER_APP_URL=https://abc123.ngrok-free.app
```

(подставьте ваш URL из ngrok)

## Шаг 5: Обновите бота и перезапустите

```bash
npm run setup
npm run bots
```

Или только курьера:

```bash
npm run start:courier
```

## Шаг 6: Проверка в Telegram

1. Откройте бота «YATAРPP КУРЬЕР»
2. Нажмите кнопку «Приложение курьера»
3. Должно открыться приложение DELIVERY

---

**Примечание:** ngrok бесплатный URL меняется при каждом перезапуске. После перезапуска ngrok обновите `.env` и снова выполните `npm run setup`.
