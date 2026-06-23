# Быстрый старт: первая заявка

Эта инструкция показывает минимальный путь от API-ключа до созданной заявки. Все примеры используют `https://example.com/api/v3`. Замените домен на домен вашего обменника.

## Что должно быть готово

Перед началом у вас должны быть:

| Что | Где получить |
| --- | --- |
| Домен обменника | У владельца обменника или администратора. |
| Bearer token | Клиент создает в личном кабинете. |
| HMAC secret | Показывается при создании ключа, если HMAC включен. |
| Scopes | Настраивает администратор. |

## 1. Проверить, что API отвечает

Запрос:

```bash
curl -sS https://example.com/api/v3/ping \
  -H "Accept: application/json"
```

Пример ответа:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "status": "ok",
    "time": "2026-06-23T10:00:00+00:00"
  },
  "meta": {
    "request_id": "req_01J...",
    "correlation_id": "cor_01J...",
    "timestamp": "2026-06-23T10:00:00+00:00"
  }
}
```

Если этот запрос не работает, проблема не в ключе. Проверьте домен, nginx, HTTPS и путь `/api/v3`.

## 2. Проверить API-ключ

Запрос:

```bash
curl -sS https://example.com/api/v3/private/health/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Пример ответа:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "client": {
      "status": "active",
      "api_access": true
    },
    "token": {
      "status": "active",
      "hmac_required": false
    }
  }
}
```

Если ответ `401`, проверьте token. Если `403`, проверьте, включил ли администратор API клиенту, scopes и IP allow-list.

## 3. Получить валюты и платежные системы

Сначала получите, что пользователь может отдать:

```bash
curl -sS "https://example.com/api/v3/private/exchange/payment-systems?filter[side]=give" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Затем получите, что пользователь может получить:

```bash
curl -sS "https://example.com/api/v3/private/exchange/payment-systems?filter[side]=receive" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Пример элемента ответа:

```json
{
  "id": 1,
  "currency_code": "USDT",
  "network": "TRC20",
  "payment": "Tether",
  "side": "give"
}
```

## 4. Найти направление обмена

Допустим, пользователь выбрал `from_currency_id=1` и `to_currency_id=2`.

```bash
curl -sS "https://example.com/api/v3/private/exchange/routes?filter[from_currency_id]=1&filter[to_currency_id]=2" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

В ответе найдите `id` направления. В следующих примерах используется `route_id = 25`.

## 5. Узнать, какие поля нужны для заявки

```bash
curl -sS https://example.com/api/v3/private/exchange/routes/25/capabilities \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Смотрите в ответе:

| Поле | Что означает |
| --- | --- |
| `available` | Можно ли сейчас создать заявку по направлению. |
| `amounts.min` / `amounts.max` | Минимальная и максимальная сумма. |
| `fields` | Какие поля нужно показать пользователю. |
| `requirements` | Нужна ли верификация или файл. |
| `rate_modes` | Доступен ли fixed/floating курс. |

## 6. Рассчитать обмен

```bash
curl -sS https://example.com/api/v3/private/exchange/quotes \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "route_id": 25,
    "amount": "100",
    "type_rate": "fixed"
  }'
```

Пример ответа:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "quote": {
      "route_id": 25,
      "amount": "100",
      "receive_amount": "0.00102",
      "rate": "0.00001020",
      "type_rate": "fixed"
    }
  }
}
```

Покажите пользователю расчет, но не считайте это созданной заявкой.

## 7. Проверить заявку перед созданием

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/preflight \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "route_id": 25,
    "amount": "100",
    "income_account": "FROM-REQUISITE",
    "outcome_account": "TO-REQUISITE",
    "type_rate": "fixed"
  }'
```

Если не хватает данных, API вернет список:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "can_create_order": false,
    "missing_fields": [
      {
        "name": "outcome_account",
        "label": "Receive wallet"
      }
    ]
  }
}
```

Если все хорошо:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "can_create_order": true
  }
}
```

## 8. Создать заявку

Для создания заявки всегда передавайте `Idempotency-Key`. Это защитит от дубля, если запрос повторится из-за timeout.

```bash
curl -sS https://example.com/api/v3/private/exchange/orders \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: create-order-user-42-001" \
  -d '{
    "route_id": 25,
    "amount": "100",
    "income_account": "FROM-REQUISITE",
    "outcome_account": "TO-REQUISITE",
    "type_rate": "fixed"
  }'
```

Пример ответа:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "order": {
      "id": 913,
      "public_id": "EX-000913",
      "tracking_id": "TRK8K2LQ",
      "status": "created",
      "amount": "100",
      "receive_amount": "0.00102"
    }
  }
}
```

Сохраните `id`, `public_id`, `tracking_id` и `status`.

## 9. Проверить статус заявки

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ/status \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Для production лучше получать статусы через webhooks, а status endpoint использовать как fallback.

## Интерактивные endpoint cards

Точные параметры и схемы этих запросов доступны в OpenAPI-разделе:

- [Exchange API Reference](../api-reference/exchange.md)
- [Orders API Reference](../api-reference/orders.md)
- [Webhooks API Reference](../api-reference/webhooks.md)
