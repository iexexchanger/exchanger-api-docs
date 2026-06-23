# HMAC-подпись запросов

HMAC нужна, чтобы API мог проверить, что запрос действительно отправил владелец ключа и что body/query не изменились по дороге.

## Когда нужна HMAC

HMAC может быть обязательной:

- для всех приватных запросов;
- только для write-запросов: `POST`, `PUT`, `PATCH`, `DELETE`;
- для конкретного API-ключа.

Если HMAC нужна, но headers не переданы, API вернет `signature_required`.

## Headers HMAC-подписи

```http
X-Api-Timestamp: 1782190000
X-Api-Nonce: req-20260623-001
X-Api-Signature: sha256=...
```

| Header | Что передавать |
| --- | --- |
| `X-Api-Timestamp` | Unix timestamp или ISO-8601 время. |
| `X-Api-Nonce` | Уникальная строка для одного запроса. |
| `X-Api-Signature` | HMAC-SHA256 подпись. |
| `X-Api-File-Sha256` | SHA-256 файла для multipart upload. |

## Строка для подписи

Подписывается такая строка:

```text
v1
METHOD
/api/v3/path
canonical_query
sha256_body
timestamp
nonce
```

Пример для GET:

```text
v1
GET
/api/v3/private/exchange/routes
filter%5Bfrom_currency_id%5D=1&filter%5Bto_currency_id%5D=2
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
1782190000
req-20260623-001
```

Пример для JSON POST:

```text
v1
POST
/api/v3/private/exchange/quotes

SHA256_OF_EXACT_JSON_BODY
1782190000
req-20260623-002
```

Пустой query остается пустой строкой.

## PHP пример

В репозитории есть helper `sdk/php/PublicApiSigner.php`.

```php
$body = PublicApiSigner::jsonBody([
    'route_id' => 25,
    'amount' => '100',
]);

$headers = PublicApiSigner::headers(
    method: 'POST',
    path: '/api/v3/private/exchange/quotes',
    hmacSecret: $hmacSecret,
    body: $body,
);
```

Важно: отправляйте ровно тот `$body`, который подписали.

## Multipart upload

Для upload файла не подписывайте весь multipart body. Подписывайте SHA-256 самого файла:

```bash
FILE_SHA=$(sha256sum passport.jpg | awk '{print $1}')
```

Передайте:

```http
X-Api-File-Sha256: FILE_SHA
```

## Частые причины `invalid_signature`

- В подписи забыли `/api/v3`.
- Подписали один JSON, а отправили другой.
- Query parameters отсортированы не так.
- Время сервера сильно отличается.
- Nonce уже использовался.
- Перепутали API HMAC secret и webhook secret.
