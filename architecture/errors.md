# Ошибки и как их обрабатывать

API возвращает HTTP status и JSON body с `error.code`.

Пример:

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
    "timestamp": "2026-06-23T10:00:00+00:00"
  }
}
```

## Что делать по HTTP status

| HTTP | Что значит | Повторять? |
| --- | --- | --- |
| `400` | Неверный запрос. | Нет, исправить запрос. |
| `401` | Нет авторизации или неверная подпись. | Нет, пока не исправлен token/HMAC. |
| `403` | Доступ запрещен. | Нет, пока не изменены права/IP/scopes. |
| `404` | Ресурс не найден. | Обычно нет. |
| `409` | Конфликт состояния или idempotency. | Только после анализа. |
| `422` | Ошибка данных. | Нет, показать пользователю поля. |
| `429` | Слишком много запросов. | Да, после `Retry-After`. |
| `5xx` | Ошибка сервера. | Да, с backoff. |

## Частые error.code

| Code | Что означает | Что делать |
| --- | --- | --- |
| `authentication_required` | Не передан Bearer token. | Добавить `Authorization`. |
| `invalid_token` | Token неверный или отключен. | Создать или проверить ключ. |
| `signature_required` | Нужна HMAC-подпись. | Добавить HMAC headers. |
| `invalid_signature` | Подпись не совпала. | Проверить canonical string. |
| `signature_replay` | Nonce уже использован. | Сгенерировать новый nonce. |
| `scope_denied` | Не хватает scope. | Добавить scope ключу. |
| `ip_not_allowed` | IP не в allow-list. | Добавить IP сервера. |
| `validation_error` | Неверные данные. | Исправить поля из `details`. |
| `idempotency_conflict` | Ключ использован для другого запроса. | Не повторять с этим key. |
| `rate_limit_exceeded` | Частотный лимит исчерпан. | Ждать `Retry-After`. |
| `quota_exceeded` | Дневная или месячная quota исчерпана. | Повысить quota или снизить нагрузку. |

## Что передавать в support

Передайте:

- `X-Request-Id`;
- endpoint;
- HTTP method;
- время запроса;
- HTTP status;
- `error.code`;
- название API-ключа, но не сам token.

