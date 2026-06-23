# Errors

Ошибки возвращаются в JSON envelope с `state: 1`.

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

## Status codes

| HTTP | Meaning | Retry |
| --- | --- | --- |
| `400` | Некорректный запрос или неподдерживаемое действие. | Нет |
| `401` | Нет token или неверная HMAC-подпись. | Нет, пока не исправлен token/signature. |
| `403` | Доступ запрещен: scope, IP, status token, API disabled. | Нет, пока не изменены права. |
| `404` | Ресурс не найден или не принадлежит клиенту. | Нет |
| `409` | Конфликт состояния или idempotency conflict. | Зависит от операции |
| `422` | Ошибка валидации входных данных. | Нет, исправьте данные |
| `429` | Rate limit или quota exceeded. | Да, после `Retry-After` |
| `5xx` | Временная ошибка сервера. | Да, с backoff |

## Common error codes

| Code | Meaning |
| --- | --- |
| `authentication_required` | Нужен Bearer token. |
| `invalid_token` | Token неверный или отозван. |
| `api_access_disabled` | API-доступ отключен. |
| `ip_not_allowed` | IP не разрешен. |
| `scope_denied` | Не хватает scope. |
| `signature_required` | Запрос должен быть подписан HMAC. |
| `invalid_signature` | HMAC-подпись неверна. |
| `signature_replay` | Nonce уже использован. |
| `validation_error` | Данные не прошли валидацию. |
| `rate_limit_exceeded` | Слишком много запросов. |
| `quota_exceeded` | Дневная или месячная quota исчерпана. |
| `idempotency_conflict` | Тот же key использован для другого запроса. |

## Support workflow

При обращении в support передайте:

- `X-Request-Id`;
- endpoint;
- HTTP method;
- время запроса;
- HTTP status;
- `error.code`;
- последние 6-8 символов token name или название ключа, без секрета.

