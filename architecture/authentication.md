# Authentication

Приватные endpoints используют Bearer token.

```http
Authorization: Bearer YOUR_API_KEY
```

## Проверка доступа

Минимальная проверка:

```bash
curl -sS https://example.com/api/v3/private/health/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Успешный ответ означает, что:

- token существует;
- клиентский аккаунт активен;
- API-доступ для клиента включен;
- token не отозван и не отключен;
- IP отправителя разрешен, если включен allow-list.

## Когда использовать HMAC

Bearer token подтверждает, кто делает запрос. HMAC дополнительно подтверждает, что тело запроса, query string и timestamp не были изменены.

Для production write-запросов HMAC должен быть включен почти всегда.

## Типичные ошибки

| HTTP | Code | Что проверить |
| --- | --- | --- |
| `401` | `authentication_required` | Token отсутствует, неверный или отозван. |
| `403` | `api_access_disabled` | API-доступ клиента отключен. |
| `403` | `token_inactive` | Ключ disabled, revoked или expired. |
| `403` | `ip_not_allowed` | IP сервера интеграции не входит в allow-list. |
| `403` | `scope_denied` | У ключа нет нужного scope. |
| `401` | `signature_required` | Для запроса нужна HMAC-подпись. |
| `401` | `invalid_signature` | Подпись не совпала. |

## Best practices

- Создавайте отдельный token для каждого приложения.
- Не отправляйте token из браузера напрямую.
- Храните token только на серверной стороне.
- Не пишите token в access logs.
- Отзывайте старые ключи после ротации.

