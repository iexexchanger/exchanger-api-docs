# Quickstart

Эта страница показывает минимальный путь от API-ключа до первой заявки.

В примерах замените:

| Placeholder | Значение |
| --- | --- |
| `example.com` | Ваш домен обменника. |
| `YOUR_API_KEY` | Bearer token из личного кабинета. |
| `25` | ID направления обмена. |

## 1. Проверить public ping

```bash
curl -sS https://example.com/api/v3/ping \
  -H "Accept: application/json"
```

Ожидаемый формат:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "status": "ok",
    "time": "2026-06-23T10:00:00+00:00"
  },
  "meta": {
    "request_id": "req_...",
    "correlation_id": "cor_...",
    "timestamp": "2026-06-23T10:00:00+00:00"
  }
}
```

## 2. Проверить приватный доступ

```bash
curl -sS https://example.com/api/v3/private/health/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Если ответ `401`, проверьте token. Если ответ `403`, проверьте доступ клиента, IP allow-list и scopes.

## 3. Получить платежные системы

```bash
curl -sS "https://example.com/api/v3/private/exchange/payment-systems?filter[side]=give" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`side=give` возвращает валюты и платежные системы, которые можно использовать на стороне отдачи. Для стороны получения используйте `side=receive`.

## 4. Найти направление

```bash
curl -sS "https://example.com/api/v3/private/exchange/routes?filter[from_currency_id]=1&filter[to_currency_id]=2" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Сохраните `route_id` нужного направления.

## 5. Получить возможности направления

```bash
curl -sS https://example.com/api/v3/private/exchange/routes/25/capabilities \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`capabilities` показывает обязательные поля, доступные действия, требования к верификации, ограничения суммы и endpoints для следующего шага.

## 6. Рассчитать quote

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
    "outcome_account": "TO-REQUISITE"
  }'
```

Если `can_create_order` равен `false`, заполните поля из `missing_fields` и повторите preflight.

## 8. Создать заявку

Для production всегда передавайте `Idempotency-Key`, чтобы повтор запроса не создал дубль.

```bash
curl -sS https://example.com/api/v3/private/exchange/orders \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: order-25-100-20260623-001" \
  -d '{
    "route_id": 25,
    "amount": "100",
    "income_account": "FROM-REQUISITE",
    "outcome_account": "TO-REQUISITE"
  }'
```

## 9. Проверить статус

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRACKING_ID/status \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Для production лучше подключить webhooks, чтобы не опрашивать статус слишком часто.

