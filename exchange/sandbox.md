# Sandbox

Sandbox позволяет проверить exchange flow без создания реальной заявки.

```bash
curl -sS https://example.com/api/v3/private/sandbox/exchange/orders/simulate \
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

## What sandbox checks

Sandbox обычно выполняет ту же предварительную проверку, что и `preflight`:

- доступность направления;
- лимиты суммы;
- обязательные поля;
- requirements;
- расчет quote;
- базовую валидность payload.

## What sandbox does not do

Sandbox не должен использоваться как реальная заявка:

- не резервирует курс как production order;
- не создает платежную задачу;
- не переводит средства;
- не заменяет production preflight.

## Webhook event

Успешная симуляция может отправить событие:

```text
api.sandbox.simulated
```

Используйте его, чтобы проверить webhook endpoint до production запуска.

