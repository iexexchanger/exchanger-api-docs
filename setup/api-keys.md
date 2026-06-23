# API-ключи, HMAC-секрет и ротация

API-ключ состоит из Bearer token и дополнительных настроек безопасности. Если включена HMAC-подпись, вместе с token используется HMAC secret.

## Bearer token

Bearer token передается в каждом приватном запросе:

```http
Authorization: Bearer YOUR_API_KEY
```

Token определяет:

- от имени какого клиента выполняется запрос;
- какие scopes доступны;
- какие лимиты применяются;
- нужен ли HMAC;
- разрешен ли IP отправителя.

## HMAC secret

HMAC secret используется для подписи запроса. Он нужен, чтобы сервер мог проверить, что body, query string, timestamp и nonce не были изменены.

Пример HMAC headers:

```http
X-Api-Timestamp: 1782190000
X-Api-Nonce: req-20260623-001
X-Api-Signature: sha256=7e4b...
```

Bearer token и HMAC secret нельзя путать:

| Секрет | Где используется |
| --- | --- |
| Bearer token | В header `Authorization`. |
| HMAC secret | Для расчета `X-Api-Signature`. |
| Webhook secret | Для проверки входящих webhook delivery. |

## Что видит клиент после создания ключа

После создания ключа клиент должен сохранить:

```text
Название ключа: production-crm
Bearer token: ...
HMAC secret: ...
Scopes: exchange:routes:read, exchange:orders:create, ...
HMAC required: true/false
```

Секреты показываются только один раз. Если окно закрыто, старый secret нельзя посмотреть повторно.

## Как хранить ключи

Правильно:

- secret manager;
- encrypted environment variables;
- server-side `.env`, который не попадает в Git;
- password manager для передачи между людьми.

Неправильно:

- вставлять токен в JavaScript на frontend;
- хранить token в GitHub;
- отправлять token в Telegram/Slack без защиты;
- писать token в server logs;
- прикладывать токен к обращению в поддержку.

## Ротация ключа

Ротация нужна, когда secret мог попасть к лишним людям или вы планово обновляете доступ.

Порядок:

1. Создайте новый ключ или выполните ротацию существующего.
2. Сохраните новый Bearer token и HMAC secret.
3. Обновите секреты в приложении.
4. Проверьте `GET /private/health/client`.
5. Проверьте создание тестовой заявки или sandbox.
6. Отключите старый ключ.

## Отзыв ключа

Отзовите ключ, если:

- интеграция больше не нужна;
- ключ потерян;
- ключ попал в лог или переписку;
- подрядчик больше не должен иметь доступ;
- в логах видны неизвестные запросы.

После отзыва приватные запросы с этим token должны перестать работать.
