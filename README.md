# iEXExchanger API

iEXExchanger API позволяет внешним приложениям получать курсы, читать доступные направления обмена, рассчитывать заявки, создавать заявки, отслеживать их статус, передавать файлы для проверок, подключать webhooks и получать партнерские данные.

API рассчитан на серверные интеграции: обменные витрины, Telegram/мобильные приложения, CRM, партнерские кабинеты, бухгалтерские системы и автоматические обработчики заявок.

## Что можно построить

| Сценарий | Что использует интеграция |
| --- | --- |
| Собственная обменная витрина | Платежные системы, направления, quote, preflight, создание заявки, статус заявки |
| Мобильное или Telegram-приложение | Те же exchange endpoints, плюс verifications и upload intents |
| CRM или back-office | Список заявок, статусы, клиентский профиль, usage, webhooks |
| Партнерский кабинет | Partner summary, referrals, exchanges, payouts, statistics |
| Автоматизация статусов | Webhooks, delivery retry, order status endpoint |
| Публичный мониторинг курсов | Public XML rates и публичные справочные endpoints |

## Базовый адрес

```text
https://{your-domain}/api/v3
```

Пример:

```text
https://example.com/api/v3
```

Если владелец обменника выдал отдельный backend-домен, используйте его. Не добавляйте `app.` автоматически: API URL должен соответствовать фактической nginx/доменной настройке установки.

Все приватные endpoints требуют:

```http
Accept: application/json
Authorization: Bearer YOUR_API_KEY
```

Если для ключа включена HMAC-защита, каждый приватный запрос также должен содержать `X-Api-Timestamp`, `X-Api-Nonce` и `X-Api-Signature`.

## Основной путь интеграции

1. Администратор включает API для клиента и назначает лимиты, scopes и правила безопасности.
2. Клиент создает API-ключ в личном кабинете и один раз сохраняет Bearer token и HMAC secret.
3. Разработчик проверяет `GET /ping` и `GET /private/health/client`.
4. Интеграция читает платежные системы и направления.
5. Для выбранного направления получает `details` или `capabilities`.
6. Перед созданием заявки выполняет `quote` и `preflight`.
7. Создает заявку с `Idempotency-Key`.
8. Отслеживает заявку через status endpoint или webhooks.

## Где начать

- [Быстрый старт](start/quick-start.md) показывает минимальный путь до первой заявки.
- [Включение доступа](setup/enable-api-access.md) описывает настройку со стороны администратора и клиента.
- [Архитектура API](architecture/base-url-versioning.md) объясняет public/private endpoints, версию и формат ответов.
- [Exchange flow](exchange/overview.md) описывает полный сценарий обмена.
- [Webhook quickstart](webhooks/overview.md) помогает подключить события.
