# Базовый URL и версия

Все endpoints находятся под `/api/v3`.

```text
https://{your-domain}/api/v3
```

Пример:

```text
https://example.com/api/v3
```

Используйте реальный домен обменника. Не добавляйте `app.` автоматически.

## Типы endpoints

| Тип | Prefix | Авторизация |
| --- | --- | --- |
| Public | `/api/v3/public/*` | Не нужна |
| Private | `/api/v3/private/*` | Bearer token |
| Ping | `/api/v3/ping` | Не нужна |
| OpenAPI | `/api/v3/openapi.yaml` | Не нужна |

## Почему версия в URL

Версия `v3` в URL нужна, чтобы интеграции не ломались при появлении новых версий API.

Правильно:

```text
https://example.com/api/v3/private/exchange/routes
```

Неправильно:

```text
https://example.com/private/exchange/routes
https://example.com/api/private/exchange/routes
```

## Headers версии

Ответ может содержать технические headers:

```http
X-Api-Version: v3
X-Api-Envelope-Version: v1
X-Api-Error-Version: v1
X-Api-Webhook-Payload-Version: v1
```

Обычно их не нужно показывать пользователю. Они полезны для диагностики и обращения в поддержку.
