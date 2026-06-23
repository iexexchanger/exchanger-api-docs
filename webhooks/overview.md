# Webhook overview

Webhooks позволяют получать события API без постоянного polling. Используйте их для статусов заявок, проверок, файлов, sandbox-событий, отзывов и партнерских операций.

## When to use webhooks

| Use case | Event examples |
| --- | --- |
| Новая заявка создана | `order.created` |
| Статус заявки изменился | `order.status_changed` |
| Оплата получена | `order.payment_received` |
| Пользователь отправил identity verification | `verification.identity.created` |
| Статус проверки изменился | `verification.identity.status_changed` |
| Файл загружен | `file.uploaded` |
| Sandbox test выполнен | `api.sandbox.simulated` |

## Create endpoint

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

Response includes endpoint data and the webhook secret. Save the secret immediately: it is used to verify delivery signatures.

## List endpoints

```bash
curl -sS https://example.com/api/v3/private/webhooks \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Test endpoint

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

## Update endpoint

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

## Rotate secret

```bash
curl -sS https://example.com/api/v3/private/webhooks/WEBHOOK_ID/rotate-secret \
  -X POST \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

After rotation, update your receiver immediately.

## Receiver requirements

Your webhook endpoint should:

- accept `POST`;
- use HTTPS;
- verify `X-Webhook-Signature`;
- return `2xx` only after successful processing;
- store processed `event_id` to prevent duplicate processing;
- complete quickly and process heavy work asynchronously.

## Recommended receiver response

```json
{
  "received": true
}
```

