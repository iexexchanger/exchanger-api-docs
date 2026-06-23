# Как проверить подпись webhook

Каждый webhook delivery подписывается. Receiver должен проверить подпись до обработки события.

## Headers webhook-запроса

```http
Content-Type: application/json
X-Webhook-Event-Id: evt_01J...
X-Webhook-Event-Type: order.status_changed
X-Webhook-Timestamp: 1782190000
X-Webhook-Nonce: wh_20260623_001
X-Webhook-Signature: sha256=...
X-Request-Id: req_01J...
X-Correlation-Id: cor_01J...
```

## Строка для проверки

```text
v1
event_id
event_type
timestamp
nonce
sha256(json_body)
```

Используйте raw body, то есть исходные bytes запроса. Не собирайте JSON заново перед проверкой.

## PHP пример проверки

```php
function verifyWebhook(
    string $secret,
    string $eventId,
    string $eventType,
    string $timestamp,
    string $nonce,
    string $rawBody,
    string $signatureHeader
): bool {
    $bodyHash = hash('sha256', $rawBody);

    $canonical = implode("\n", [
        'v1',
        $eventId,
        $eventType,
        $timestamp,
        $nonce,
        $bodyHash,
    ]);

    $expected = 'sha256='.hash_hmac('sha256', $canonical, $secret);

    return hash_equals($expected, $signatureHeader)
        || hash_equals(substr($expected, 7), $signatureHeader);
}
```

## Защита от повторов

Сохраняйте:

```text
X-Webhook-Event-Id
```

Если такое событие уже обработано, верните `2xx` и не выполняйте бизнес-действие повторно.

## Частые ошибки

| Ошибка | Как исправить |
| --- | --- |
| Проверяется parsed JSON, а не raw body | Сохраняйте raw body до парсинга. |
| Используется API HMAC secret | Для webhook нужен webhook secret. |
| Receiver возвращает `2xx` до сохранения события | Сначала сохраните событие, потом отвечайте. |
| Дубликат события считается ошибкой | Дубликаты нормальны при retry, отвечайте `2xx`. |
