# Как подключить webhooks

Webhooks нужны, чтобы ваше приложение получало события автоматически, без постоянного опроса API.

Главный пример: статус заявки изменился, iEXExchanger отправил запрос на ваш URL, ваше приложение обновило статус у себя.

## Когда использовать webhooks

| Сценарий | События |
| --- | --- |
| Статусы заявок | `order.created`, `order.status_changed`, `order.payment_received` |
| Проверки пользователя | `verification.identity.created`, `verification.identity.status_changed` |
| Проверки карты | `verification.card.created`, `verification.card.status_changed` |
| Файлы | `file.uploaded` |
| Sandbox | `api.sandbox.simulated` |
| Отзывы | `review.created` |
| Партнерские выплаты | `partner.payout.paid` |

## Создать webhook endpoint

```bash
curl -sS https://example.com/api/v3/private/webhooks \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "url": "https://client.example.net/webhooks/iex",
    "events": ["order.created", "order.status_changed"],
    "description": "Production order status handler"
  }'
```

В ответе будет webhook secret. Сохраните его сразу. Он нужен для проверки подписи входящих webhook-запросов.

## Получить список webhooks

```bash
curl -sS https://example.com/api/v3/private/webhooks \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Отправить тестовое событие

```bash
curl -sS https://example.com/api/v3/private/webhooks/test \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "url": "https://client.example.net/webhooks/iex",
    "event": "api.test"
  }'
```

## Изменить webhook

```bash
curl -sS https://example.com/api/v3/private/webhooks/WEBHOOK_ID \
  -X PATCH \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "events": ["order.created", "order.status_changed", "order.payment_received"],
    "status": "active"
  }'
```

## Сменить webhook secret

```bash
curl -sS https://example.com/api/v3/private/webhooks/WEBHOOK_ID/rotate-secret \
  -X POST \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

После смены secret сразу обновите его в своем receiver.

## Требования к receiver

Ваш webhook endpoint должен:

- принимать `POST`;
- работать по HTTPS;
- проверять `X-Webhook-Signature`;
- сохранять `event_id`;
- возвращать `2xx` только после успешного сохранения события;
- обрабатывать повторные события без дублей.

## API Reference

Точные параметры webhook endpoints доступны на странице [Webhooks API Reference](../api-reference/webhooks.md).
