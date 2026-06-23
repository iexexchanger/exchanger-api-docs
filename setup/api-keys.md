# API keys

API-ключ состоит из Bearer token и, если включена подпись, HMAC secret.

## Bearer token

Bearer token передается в каждом приватном запросе:

```http
Authorization: Bearer YOUR_API_KEY
```

Token дает доступ к аккаунту клиента в пределах выданных scopes. Не используйте один token для разных приложений: создавайте отдельный ключ для production, staging, CRM, mobile backend и других интеграций.

## HMAC secret

HMAC secret нужен для подписи запросов. Он не заменяет Bearer token, а усиливает его.

```http
X-Api-Timestamp: 1782190000
X-Api-Nonce: req-20260623-001
X-Api-Signature: sha256=...
```

Подробный алгоритм: [HMAC request signing](../architecture/hmac-signature.md).

## Scopes

Scopes ограничивают, что может делать ключ:

| Тип ключа | Пример scopes |
| --- | --- |
| Только чтение заявок | `orders:read`, `orders:detail:read`, `orders:statuses:read` |
| Создание обменов | `exchange:routes:read`, `exchange:quotes:read`, `exchange:preflight:read`, `exchange:orders:create` |
| Подтверждение оплаты | `exchange:orders:confirm`, `exchange:orders:actions:read` |
| Webhooks | `webhooks:read`, `webhooks:write`, `webhooks:deliveries:read` |
| Партнерский кабинет | `partner:read`, `partner:statistics:read`, `partner:referrals:read` |

Полный список: [Scopes](../reference/scopes.md).

## Rotation

Ротация создает новый Bearer token и новый HMAC secret. Старый ключ может работать короткое время, чтобы интеграция успела переключиться.

Безопасный порядок:

1. Создайте или сгенерируйте новый ключ.
2. Добавьте его в secret storage.
3. Перезапустите интеграцию.
4. Проверьте `GET /private/health/client`.
5. Отключите старый ключ.

## Revocation

Отзывайте ключ, если:

- секрет попал в лог, тикет, чат или email;
- разработчик или подрядчик больше не должен иметь доступ;
- интеграция выключена;
- ключ используется с неизвестного IP;
- в delivery/logs видны подозрительные запросы.

После отзыва token сразу перестает работать.

