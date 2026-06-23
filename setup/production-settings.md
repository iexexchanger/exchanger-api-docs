# Production settings

Перед запуском API в production настройте ограничения и правила безопасности. Названия ниже описывают поведение, а конкретное расположение настроек зависит от вашей админки.

## Global API access

Глобальный переключатель API должен быть включен только тогда, когда вы готовы принимать внешние запросы.

Если API отключен глобально, приватные и публичные API endpoints возвращают ошибку доступности. Это удобно для аварийного отключения интеграций.

## HMAC policy

Рекомендуемые варианты:

| Policy | Когда использовать |
| --- | --- |
| HMAC для всех приватных запросов | Максимальная защита production-интеграций. |
| HMAC только для write-запросов | Баланс безопасности и простоты. |
| HMAC опционально на уровне ключа | Для постепенного подключения клиентов. |

Write-запросы это `POST`, `PUT`, `PATCH`, `DELETE`.

## Timestamp tolerance

Сервер проверяет, что `X-Api-Timestamp` не слишком старый и не слишком будущий. Обычно достаточно окна около 5 минут.

Если у интегратора часто возникают ошибки подписи, сначала проверьте синхронизацию времени на сервере клиента.

## Rate limits

Rate limit защищает API от слишком частых запросов. Клиент должен читать headers:

```http
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 118
Retry-After: 30
```

При `429` интеграция должна остановить повтор до истечения `Retry-After`.

## Quotas

Quota ограничивает суммарное использование за день или месяц. Она отличается от rate limit:

| Механизм | Что ограничивает |
| --- | --- |
| Rate limit | Частоту запросов в коротком окне. |
| Quota | Общий объем запросов за день или месяц. |

Если quota исчерпана, увеличьте лимит для клиента или оптимизируйте интеграцию: используйте webhooks, кэшируйте справочники и не опрашивайте статус слишком часто.

## Webhook limits

Ограничьте количество webhook endpoints на клиента. Обычно достаточно:

- 1 endpoint для production;
- 1 endpoint для staging;
- 1 endpoint для аварийного fallback или миграции.

## Recommended defaults

| Настройка | Рекомендация |
| --- | --- |
| HMAC | Required for write requests. |
| IP allow-list | Required for server-to-server production. |
| Idempotency | Required in client implementation for order creation. |
| Webhooks | Required for status automation. |
| Polling | Use only as fallback. |
| Secrets | Store in vault or encrypted environment storage. |

