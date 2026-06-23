# Rate limits and quotas

API использует два типа ограничений.

| Mechanism | Purpose |
| --- | --- |
| Rate limit | Ограничивает частоту запросов в коротком окне. |
| Quota | Ограничивает общий объем запросов за день или месяц. |

## Rate limit headers

```http
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 118
X-RateLimit-Reset: 1782190300
Retry-After: 30
```

Если API вернул `429`, клиент должен ждать `Retry-After`.

## Quota headers

Ответы могут содержать информацию о дневной и месячной quota:

```http
X-Api-Quota-Daily-Limit: 10000
X-Api-Quota-Daily-Remaining: 9984
X-Api-Quota-Monthly-Limit: 300000
X-Api-Quota-Monthly-Remaining: 299120
```

## Usage endpoint

```bash
curl -sS https://example.com/api/v3/private/usage \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Используйте `usage`, чтобы показывать клиенту расход API и заранее предупреждать о приближении к quota.

## How to reduce API usage

- Кэшируйте payment systems и routes на короткое время.
- Используйте webhooks вместо частого polling.
- Проверяйте статус заявки по событию, а не каждую секунду.
- Не вызывайте `quote` на каждый ввод символа; используйте debounce.
- Объединяйте фильтры в один запрос, если возможно.

