# Расчет, preflight и создание заявки

Заявку нужно создавать в три шага:

```text
quote -> preflight -> create order
```

## 1. Рассчитать quote

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

Quote нужен, чтобы показать расчет пользователю. Quote не создает заявку.

## 2. Проверить preflight

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

Если данных не хватает:

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

Если можно создавать заявку:

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "can_create_order": true
  }
}
```

## 3. Создать заявку

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

## Основные поля заявки

| Поле | Обязательно | Что означает |
| --- | --- | --- |
| `route_id` | Обычно да | ID направления. |
| `amount` | Да | Сумма, которую пользователь отдает. |
| `income_account` | Зависит от направления | Реквизит стороны отдачи. |
| `outcome_account` | Зависит от направления | Реквизит стороны получения. |
| `type_rate` | Нет | `fixed` или `floating`. |
| `promo_code` | Нет | Промокод. |
| `city_id` | Зависит от направления | Город для наличных направлений. |
| `direction_fields` | Зависит от направления | Дополнительные поля направления. |
| `user_fields` | Зависит от направления | Дополнительные поля пользователя. |
| `snapshot` | Желательно, если API его вернул | Снимок условий направления. |

## Совместимые alias-поля

| Рекомендуемое поле | Alias |
| --- | --- |
| `route_id` | `direction_id` |
| `amount` | `income_amount` |
| `income_account` | `from_requisite` |
| `outcome_account` | `to_requisite` |
| `from_currency_id` | `income_payment_system` |
| `to_currency_id` | `outcome_payment_system` |

В новых интеграциях используйте рекомендуемые поля.

