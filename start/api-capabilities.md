# Все возможности API

Эта страница помогает быстро понять, что можно подключить через iEXExchanger API и какие разделы документации читать дальше.

API закрывает три основные задачи:

1. построить собственную форму обмена или приложение;
2. синхронизировать заявки, статусы, документы и события;
3. дать партнерам и внутренним системам безопасный доступ только к нужным данным.

## Карта возможностей

| Возможность | Для чего нужна | Основные endpoints | Scopes |
| --- | --- | --- | --- |
| Проверка API | Убедиться, что домен, версия API и ключ работают. | `GET /ping`, `GET /private/health/client`, `GET /private/ping` | `client:health:read` |
| Профиль клиента | Понять, от чьего имени работает ключ. | `GET /private/client` | `public-api:client:read` |
| Usage и квоты | Показывать расход API, лимиты и остаток запросов. | `GET /private/usage` | `usage:read` |
| Scopes | Проверить, какие права доступны ключу. | `GET /private/scopes` | `scopes:read` |
| Платежные системы | Построить список валют, сетей и платежных направлений. | `GET /private/exchange/payment-systems` | `exchange:routes:read` |
| Направления обмена | Найти доступную пару обмена и ее условия. | `GET /private/exchange/routes`, `GET /private/exchange/routes/{route}` | `exchange:routes:read` |
| Возможности направления | Узнать лимиты, поля формы, требования и доступные действия. | `GET /private/exchange/routes/{route}/capabilities` | `exchange:capabilities:read` |
| Расчет суммы | Показать пользователю курс и сумму к получению до заявки. | `POST /private/exchange/quotes` | `exchange:quotes:read` |
| Проверка заявки | Проверить payload, обязательные поля и требования перед созданием. | `POST /private/exchange/orders/preflight` | `exchange:preflight:read` |
| Создание заявки | Создать реальную заявку обмена от имени клиента. | `POST /private/exchange/orders` | `exchange:orders:create` |
| Действия по заявке | Получить статус, доступные действия, подтвердить оплату или отменить. | `GET /private/exchange/orders/{order}/status`, `GET /private/exchange/orders/{order}/actions`, `POST /private/exchange/orders/{order}/confirm`, `POST /private/exchange/orders/{order}/cancel` | `orders:detail:read`, `exchange:orders:actions:read`, `exchange:orders:confirm`, `exchange:orders:cancel` |
| Список заявок | Синхронизировать CRM, отчеты, историю клиента или поддержку. | `GET /private/orders`, `GET /private/orders/{order}`, `GET /private/orders/statuses` | `orders:read`, `orders:detail:read`, `orders:statuses:read` |
| Файлы | Загружать документы и вложения через upload intent. | `POST /private/files/upload-intents`, `POST /private/files/upload-intents/{intent}/commit` | `files:write`, `files:read` |
| Верификации | Передавать проверку личности, карты или данные проверки по заявке. | `GET /private/verifications/requirements`, `POST /private/verifications/identity`, `POST /private/verifications/cards`, `POST /private/exchange/orders/{order}/verifications/submit` | `verifications:read`, `verifications:write` |
| Webhooks | Получать события без постоянного опроса статусов. | `GET /private/webhooks`, `POST /private/webhooks`, `GET /private/webhooks/events`, `GET /private/webhooks/deliveries` | `webhooks:read`, `webhooks:write`, `webhooks:deliveries:read` |
| Партнерский кабинет | Получать партнерскую сводку, статистику, рефералов, обмены и выплаты. | `GET /private/partner`, `GET /private/partner/statistics`, `GET /private/partner/referrals`, `GET /private/partner/exchanges`, `GET /private/partner/payouts` | `partner:read`, `partner:statistics:read`, `partner:referrals:read`, `partner:exchanges:read`, `partner:payouts:read` |
| Отзывы | Читать отзывы и создавать отзыв по своей заявке. | `GET /private/reviews`, `POST /private/reviews` | `reviews:read`, `reviews:write` |
| Sandbox | Проверять payload создания заявки без реальной заявки. | `POST /private/sandbox/exchange/orders/simulate` | `sandbox:run` |
| Contracts и schemas | Сверять версии контрактов и JSON Schema для автоматических проверок. | `GET /public/contracts`, `GET /private/contracts`, `GET /public/schemas`, `GET /private/schemas` | `contracts:read`, `schemas:read` |

## Что подключать в первую очередь

Если вы делаете форму обмена, начните с этого набора:

```text
GET  /private/health/client
GET  /private/exchange/payment-systems
GET  /private/exchange/routes
GET  /private/exchange/routes/{route}/capabilities
POST /private/exchange/quotes
POST /private/exchange/orders/preflight
POST /private/exchange/orders
GET  /private/exchange/orders/{order}/status
```

Если вы делаете CRM или отчетность, обычно достаточно:

```text
GET /private/orders/statuses
GET /private/orders
GET /private/orders/{order}
GET /private/usage
```

Если вы делаете партнерский кабинет:

```text
GET /private/partner
GET /private/partner/statistics
GET /private/partner/referrals
GET /private/partner/exchanges
GET /private/partner/payouts
```

Если вы запускаете production-интеграцию, добавьте:

```text
POST /private/webhooks
GET  /private/webhooks/events
GET  /private/webhooks/deliveries
POST /private/sandbox/exchange/orders/simulate
```

## Как читать документацию дальше

| Если нужно | Откройте |
| --- | --- |
| Получить ключ и понять роли | [Кто что делает](roles-and-responsibilities.md), [Как клиенту получить API-ключ](../setup/client-get-api-key.md) |
| Создать первую заявку | [Быстрый старт](quick-start.md) |
| Настроить безопасность | [Авторизация](../architecture/authentication.md), [HMAC-подпись](../architecture/hmac-signature.md), [Idempotency-Key](../architecture/idempotency.md) |
| Сделать форму обмена | [Платежные системы и направления](../exchange/payment-systems-and-routes.md), [Расчет, preflight и создание заявки](../exchange/quotes-preflight-orders.md) |
| Загружать документы | [Файлы и верификации](../exchange/files-and-verifications.md) |
| Получать события | [Как подключить webhooks](../webhooks/overview.md) |
| Смотреть точный контракт | [API Reference](../reference/openapi-reference.md), [Все endpoints](../reference/endpoints.md) |

## Правило для scopes

Не выдавайте ключу все права сразу. Выберите минимальный набор под сценарий:

- форма обмена не обязана читать партнерские выплаты;
- CRM для отчетов не обязана создавать заявки;
- webhook-настройки лучше держать в отдельном admin/backend ключе;
- sandbox можно включить на время тестирования и отключить после запуска.

Полный список прав: [Scopes и права ключа](../reference/scopes.md).
