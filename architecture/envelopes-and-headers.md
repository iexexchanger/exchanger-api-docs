# Формат запросов, ответов и headers

Большинство endpoints возвращает JSON в едином формате.

## Успешный ответ

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "id": 25
  },
  "meta": {
    "request_id": "req_01J...",
    "correlation_id": "cor_01J...",
    "timestamp": "2026-06-23T10:00:00+00:00"
  }
}
```

| Поле | Значение |
| --- | --- |
| `state` | `0` значит успех. |
| `message` | Короткое сообщение. |
| `result` | Основные данные ответа. |
| `meta.request_id` | ID запроса для обращения в поддержку. |
| `meta.correlation_id` | ID цепочки связанных запросов. |

## Ответ с ошибкой

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
    "request_id": "req_01J...",
    "correlation_id": "cor_01J...",
    "timestamp": "2026-06-23T10:00:00+00:00"
  }
}
```

| Поле | Значение |
| --- | --- |
| `state` | `1` значит ошибка. |
| `error.code` | Машинный код ошибки. |
| `error.details` | Детали, часто ошибки полей. |

## Headers для JSON-запроса

```http
Accept: application/json
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

`Content-Type` нужен для запросов с body: `POST`, `PUT`, `PATCH`.

## Headers для HMAC

```http
X-Api-Timestamp: 1782190000
X-Api-Nonce: req-20260623-001
X-Api-Signature: sha256=...
```

## Headers для защиты от дублей

```http
Idempotency-Key: create-order-user-42-001
```

## Полезные headers ответа

| Header | Что означает |
| --- | --- |
| `X-Request-Id` | ID запроса для обращения в поддержку. |
| `X-Correlation-Id` | ID цепочки запросов. |
| `X-RateLimit-Limit` | Лимит запросов в текущем окне. |
| `X-RateLimit-Remaining` | Сколько осталось запросов. |
| `Retry-After` | Сколько ждать после `429`. |
| `Idempotency-Replayed` | Ответ взят из сохраненного idempotency-result. |

## Исключение: XML

`GET /public/rates.xml` возвращает XML, а не JSON envelope.
