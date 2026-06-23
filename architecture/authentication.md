# Авторизация Bearer-токеном

Все приватные endpoints требуют Bearer-токен.

```http
Authorization: Bearer YOUR_API_KEY
```

## Проверка токена

```bash
curl -sS https://example.com/api/v3/private/health/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Если токен работает, API вернет `state: 0`.

## Что проверяет API

При каждом приватном запросе API проверяет:

1. Передан ли Bearer-токен.
2. Существует ли такой токен.
3. Активен ли аккаунт клиента.
4. Включен ли API-доступ клиенту.
5. Активен ли сам ключ.
6. Не истек ли срок ключа.
7. Разрешен ли IP, если включен allow-list.
8. Есть ли нужный scope для endpoint.
9. Нужна ли HMAC-подпись.

## Типичные ошибки доступа

| HTTP | Code | Что делать |
| --- | --- | --- |
| `401` | `authentication_required` | Добавить `Authorization: Bearer ...`. |
| `401` | `invalid_token` | Проверить токен или создать новый ключ. |
| `401` | `signature_required` | Добавить HMAC headers. |
| `401` | `invalid_signature` | Исправить расчет подписи. |
| `403` | `api_access_disabled` | Попросить администратора включить API клиенту. |
| `403` | `ip_not_allowed` | Добавить IP сервера в allow-list. |
| `403` | `scope_denied` | Добавить нужный scope ключу. |

## Где хранить токен

Токен должен храниться только на backend-стороне интеграции. Если у вас сайт или мобильное приложение, frontend обращается к вашему backend, а backend вызывает iEXExchanger API.
