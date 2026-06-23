# Лимиты, квоты и Retry-After

API может ограничивать частоту и общий объем запросов.

## Частотный лимит

Rate limit ограничивает частоту запросов.

Пример headers:

```http
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 118
X-RateLimit-Reset: 1782190300
```

Если лимит превышен:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 30
```

Интеграция должна подождать `Retry-After`, а не повторять запрос сразу.

## Квота

Quota ограничивает общий объем запросов за день или месяц.

Пример:

```http
X-Api-Quota-Daily-Limit: 10000
X-Api-Quota-Daily-Remaining: 9984
X-Api-Quota-Monthly-Limit: 300000
X-Api-Quota-Monthly-Remaining: 299120
```

## Как посмотреть usage

```bash
curl -sS https://example.com/api/v3/private/usage \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Как уменьшить нагрузку

- Не запрашивайте статус заявки каждую секунду.
- Подключите webhooks.
- Кэшируйте платежные системы и направления на короткое время.
- Делайте debounce для расчета quote.
- Не повторяйте `401`, `403`, `422` бесконечно.
