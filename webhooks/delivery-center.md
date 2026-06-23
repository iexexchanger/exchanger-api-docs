# Delivery center and retry

Delivery center helps inspect webhook events and deliveries.

## List events

```bash
curl -sS "https://example.com/api/v3/private/webhooks/events?filter[type]=order.status_changed" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Get event

```bash
curl -sS https://example.com/api/v3/private/webhooks/events/EVENT_ID \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## List deliveries

```bash
curl -sS "https://example.com/api/v3/private/webhooks/deliveries?filter[status]=failed" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Get delivery

```bash
curl -sS https://example.com/api/v3/private/webhooks/deliveries/DELIVERY_ID \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Retry delivery

```bash
curl -sS https://example.com/api/v3/private/webhooks/deliveries/DELIVERY_ID/retry \
  -X POST \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Delivery statuses

| Status | Meaning |
| --- | --- |
| `pending` | Delivery создана, но еще не отправлена. |
| `delivered` | Receiver вернул `2xx`. |
| `failed` | Receiver не ответил успешно. |
| `retrying` | Delivery ожидает следующий retry. |

## Retry behavior

Webhook delivery может повторяться автоматически. Receiver должен быть idempotent:

- храните `event_id`;
- не создавайте дубль операции при повторе;
- возвращайте `2xx` для уже обработанного события;
- не полагайтесь на порядок доставки разных событий.

## Troubleshooting failed delivery

Проверьте:

1. endpoint доступен по HTTPS;
2. TLS certificate действителен;
3. receiver отвечает быстрее timeout;
4. receiver возвращает `2xx`;
5. raw body сохраняется до signature verification;
6. webhook secret актуален после rotation;
7. firewall пропускает входящие запросы.

