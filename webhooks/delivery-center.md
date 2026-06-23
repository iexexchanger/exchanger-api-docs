# История доставок и повторная отправка

Центр доставок нужен, чтобы смотреть, какие webhook-события были созданы, куда они отправлялись и почему доставка могла не пройти.

## Получить события

```bash
curl -sS "https://example.com/api/v3/private/webhooks/events?filter[type]=order.status_changed" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Получить одно событие

```bash
curl -sS https://example.com/api/v3/private/webhooks/events/EVENT_ID \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Получить доставки

```bash
curl -sS "https://example.com/api/v3/private/webhooks/deliveries?filter[status]=failed" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Повторить доставку

```bash
curl -sS https://example.com/api/v3/private/webhooks/deliveries/DELIVERY_ID/retry \
  -X POST \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Статусы доставки

| Статус | Что означает |
| --- | --- |
| `pending` | Доставка создана, но еще не отправлена. |
| `delivered` | Receiver вернул `2xx`. |
| `failed` | Receiver не ответил успешно. |
| `retrying` | Доставка ожидает следующую попытку. |

## Что проверять при failed

1. URL доступен из интернета.
2. HTTPS-сертификат действителен.
3. Receiver отвечает достаточно быстро.
4. Receiver возвращает `2xx`.
5. Подпись проверяется по raw body.
6. Webhook secret актуален после rotation.
7. Firewall пропускает входящие запросы.
