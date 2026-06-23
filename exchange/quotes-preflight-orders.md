# Quote, preflight and order creation

Создание заявки должно проходить через три шага:

```text
quote -> preflight -> create order
```

Так интеграция сначала показывает пользователю расчет, затем проверяет обязательные поля, и только потом создает заявку.

## Quote

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

Typical response:

```json
{
  "state": 0,
  "result": {
    "route_id": 25,
    "amount": "100",
    "receive_amount": "0.00102",
    "rate": "0.00001020",
    "type_rate": "fixed",
    "expires_at": "2026-06-23T10:05:00+00:00"
  }
}
```

Use quote to show estimated receive amount. Do not treat quote as created order.

## Preflight

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

If data is incomplete:

```json
{
  "state": 0,
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

If data is valid:

```json
{
  "state": 0,
  "result": {
    "can_create_order": true,
    "quote": {
      "amount": "100",
      "receive_amount": "0.00102",
      "rate": "0.00001020"
    }
  }
}
```

## Create order

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

Typical response:

```json
{
  "state": 0,
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

Save at least:

- `id`;
- `public_id`;
- `tracking_id`;
- `status`;
- amount and receive amount shown to the user.

## Payload fields

Common fields:

| Field | Required | Description |
| --- | --- | --- |
| `route_id` | Usually yes | Direction ID. |
| `amount` | Yes | Amount user gives. |
| `income_account` | Depends on route | Requisite on give side. |
| `outcome_account` | Depends on route | Requisite on receive side. |
| `type_rate` | No | `fixed` or `floating`. |
| `promo_code` | No | Promo code if supported. |
| `city_id` | Depends on route | City for cash directions. |
| `direction_fields` | Depends on route | Dynamic route fields. |
| `user_fields` | Depends on route | Dynamic user fields. |
| `snapshot` | Recommended when provided | Route snapshot from details/capabilities. |

## Aliases

API accepts several aliases for compatibility:

| Preferred | Common alias |
| --- | --- |
| `route_id` | `direction_id` |
| `amount` | `income_amount` |
| `income_account` | `from_requisite` |
| `outcome_account` | `to_requisite` |
| `from_currency_id` | `income_payment_system` |
| `to_currency_id` | `outcome_payment_system` |

Prefer the modern field names in new integrations.

