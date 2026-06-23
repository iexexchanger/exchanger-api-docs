# cURL: полный путь до заявки

Этот пример показывает весь путь через обычные HTTP-запросы: проверить ключ, получить направление, рассчитать обмен, выполнить preflight и создать заявку.

В примерах замените:

| Placeholder | Значение |
| --- | --- |
| `example.com` | Домен вашего обменника. |
| `YOUR_API_KEY` | Bearer-токен из кабинета клиента. |
| `25` | ID выбранного направления. |
| `FROM-REQUISITE` | Реквизит пользователя на стороне отдачи. |
| `TO-REQUISITE` | Реквизит пользователя на стороне получения. |

## 1. Проверить API

```bash
curl -sS https://example.com/api/v3/ping \
  -H "Accept: application/json"
```

Ожидаемый результат:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "status": "ok"
  }
}
```

## 2. Проверить ключ клиента

```bash
curl -sS https://example.com/api/v3/private/health/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Если ключ активен:

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

## 3. Получить платежные системы

Сторона отдачи:

```bash
curl -sS "https://example.com/api/v3/private/exchange/payment-systems?filter[side]=give" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Сторона получения:

```bash
curl -sS "https://example.com/api/v3/private/exchange/payment-systems?filter[side]=receive" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 4. Найти направление

```bash
curl -sS "https://example.com/api/v3/private/exchange/routes?filter[from_currency_id]=1&filter[to_currency_id]=2" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Из ответа возьмите `id` направления. Ниже используется `25`.

## 5. Получить возможности направления

```bash
curl -sS https://example.com/api/v3/private/exchange/routes/25/capabilities \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Проверьте:

- `available = true`;
- сумма входит в `amounts.min` и `amounts.max`;
- пользователь заполнил обязательные `fields`;
- нет невыполненных `requirements`.

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
      "amount": "100",
      "receive_amount": "0.00102",
      "rate": "0.00001020",
      "type_rate": "fixed"
    }
  }
}
```

## 7. Выполнить preflight

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

Если `can_create_order = false`, покажите пользователю `missing_fields` и не создавайте заявку.

## 8. Создать заявку

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
      "status": "created"
    }
  }
}
```

Сохраните `tracking_id`. Он нужен для статуса и support.

## 9. Проверить статус

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ/status \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

