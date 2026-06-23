# HMAC request signing

HMAC-подпись защищает приватные запросы от изменения body, query и replay.

## Headers

| Header | Required | Description |
| --- | --- | --- |
| `X-Api-Timestamp` | Да | Unix timestamp или ISO-8601 время. |
| `X-Api-Nonce` | Да | Уникальная строка 8-128 символов. |
| `X-Api-Signature` | Да | `sha256={hex_hmac}`. |
| `X-Api-File-Sha256` | Только upload | SHA-256 файла для multipart requests. |

Nonce может содержать:

```text
A-Z a-z 0-9 . _ : -
```

## Canonical string

Подписывается строка:

```text
v1
METHOD
/api/v3/path
canonical_query
sha256_body
timestamp
nonce
```

Важно: path должен включать `/api/v3`.

## GET example

Запрос:

```text
GET /api/v3/private/exchange/routes?filter[from_currency_id]=1&filter[to_currency_id]=2
```

Canonical string:

```text
v1
GET
/api/v3/private/exchange/routes
filter%5Bfrom_currency_id%5D=1&filter%5Bto_currency_id%5D=2
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
1782190000
req-20260623-001
```

Пустое тело подписывается SHA-256 от пустой строки.

## JSON POST example

Для JSON подписывайте ровно те bytes, которые отправляете в HTTP body.

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

Затем отправляйте тот же `$body`:

```php
$client->post('https://example.com/api/v3/private/exchange/quotes', [
    'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer '.$apiKey,
        ...$headers,
    ],
    'body' => $body,
]);
```

Не создавайте JSON повторно после подписи: другие пробелы или другой порядок ключей дадут другой hash.

## Query canonicalization

Правила:

- вложенные ключи пишутся как `filter[from_currency_id]`;
- ключи и значения кодируются по RFC3986;
- пары сортируются строково;
- порядок query в исходном URL не важен, если canonical query построен правильно.

Пример:

```text
filter[from_currency_id]=1&filter[to_currency_id]=2
```

Canonical query:

```text
filter%5Bfrom_currency_id%5D=1&filter%5Bto_currency_id%5D=2
```

## Multipart upload

Для `multipart/form-data` не подписывайте весь multipart body. HTTP-клиент сам добавляет boundary, поэтому итоговые bytes могут отличаться.

Правильный порядок:

1. Посчитайте SHA-256 файла.
2. Передайте его в `X-Api-File-Sha256`.
3. Используйте этот hash как `sha256_body` в canonical string.
4. Отправьте файл обычным multipart request.

## Common mistakes

| Ошибка | Как исправить |
| --- | --- |
| Подписан path без `/api/v3` | Всегда подписывайте полный API path. |
| JSON подписан одним способом, отправлен другим | Подписывайте готовую строку body и отправляйте ее без изменений. |
| Старый timestamp | Синхронизируйте время сервера. |
| Повторный nonce | Генерируйте новый nonce на каждый запрос. |
| Перепутан API secret и webhook secret | Храните их раздельно. |
| Для upload не указан file hash | Передайте `X-Api-File-Sha256`. |

