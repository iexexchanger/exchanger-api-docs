# Requests, envelopes and headers

API возвращает единый JSON envelope для большинства endpoints.

## Success envelope

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "id": 25
  },
  "meta": {
    "request_id": "req_...",
    "correlation_id": "cor_...",
    "timestamp": "2026-06-23T10:00:00+00:00"
  }
}
```

## Error envelope

```json
{
  "state": 1,
  "message": "Validation failed",
  "result": null,
  "error": {
    "code": "validation_error",
    "details": {
      "amount": ["The amount field is required."]
    }
  },
  "meta": {
    "request_id": "req_...",
    "correlation_id": "cor_...",
    "timestamp": "2026-06-23T10:00:00+00:00"
  }
}
```

## Required request headers

Для JSON:

```http
Accept: application/json
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

Для HMAC:

```http
X-Api-Timestamp: 1782190000
X-Api-Nonce: req-20260623-001
X-Api-Signature: sha256=...
```

Для upload:

```http
Content-Type: multipart/form-data
X-Api-File-Sha256: FILE_SHA256
```

## Useful response headers

| Header | Meaning |
| --- | --- |
| `X-Request-Id` | ID запроса для support и логов. |
| `X-Correlation-Id` | ID цепочки запросов. |
| `X-Api-Version` | Версия API. |
| `X-RateLimit-Limit` | Лимит в текущем окне. |
| `X-RateLimit-Remaining` | Остаток запросов в текущем окне. |
| `X-RateLimit-Reset` | Когда окно лимита сбросится. |
| `Retry-After` | Сколько ждать после `429`. |
| `X-Response-Time-Ms` | Время обработки запроса. |

## XML exception

`GET /public/rates.xml` возвращает XML, а не JSON envelope. Используйте этот endpoint для совместимости с мониторингами и внешними каталогами курсов.

