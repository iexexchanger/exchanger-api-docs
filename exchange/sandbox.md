# Sandbox-проверка

Sandbox позволяет проверить сценарий обмена без создания реальной заявки.

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

## Что проверяет sandbox

- доступность направления;
- лимиты суммы;
- обязательные поля;
- требования к проверкам;
- расчет quote;
- базовую валидность payload.

## Чего sandbox не делает

- не создает реальную заявку;
- не резервирует курс как production order;
- не переводит средства;
- не заменяет production preflight.

## Webhook-событие

Успешная симуляция может отправить событие:

```text
api.sandbox.simulated
```

Используйте его, чтобы проверить webhook endpoint до production-запуска.

