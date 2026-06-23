# Как читать API Reference

API Reference построен из файла:

```text
openapi/openapi.yaml
```

Это точный контракт API: endpoints, параметры, request body, headers, responses, security и схемы данных.

## Когда открывать API Reference

Открывайте API Reference, когда нужно узнать:

- какой HTTP method использовать;
- какой path у endpoint;
- какие query parameters доступны;
- какие поля передавать в JSON body;
- какие headers нужны;
- какой scope требуется ключу;
- какие ответы может вернуть API.

## Как пользоваться вместе с руководствами

Руководства показывают порядок действий. API Reference показывает точные детали запроса.

Пример:

1. В guide [Расчет, preflight и создание заявки](../exchange/quotes-preflight-orders.md) описан сценарий создания заявки.
2. На странице [Exchange API Reference](../api-reference/exchange.md) можно открыть точный endpoint `POST /private/exchange/orders`.
3. В [Scopes и права ключа](scopes.md) можно проверить, какие права нужны ключу.

## Группы API Reference

| Страница | Что смотреть |
| --- | --- |
| [System и Client](../api-reference/system-client.md) | Проверка API, проверка ключа, профиль клиента, usage. |
| [Exchange](../api-reference/exchange.md) | Платежные системы, направления, quote, preflight, создание заявки, статус. |
| [Orders](../api-reference/orders.md) | Список заявок и справочник статусов. |
| [Files и Verifications](../api-reference/files-verifications.md) | Загрузка файлов, identity/card verification. |
| [Webhooks](../api-reference/webhooks.md) | Webhook endpoints, события, доставки, retry. |
| [Partner, Reviews и Sandbox](../api-reference/partner-reviews-sandbox.md) | Партнерка, отзывы и тестовая симуляция заявки. |

## OpenAPI-файл

Файл можно использовать в инструментах разработчика:

- импортировать в Postman;
- импортировать в Insomnia;
- открыть в Swagger UI;
- использовать для генерации собственного клиента.

Live OpenAPI на установленном обменнике:

```text
https://{your-domain}/api/v3/openapi.yaml
```

Если вы работаете с конкретным обменником, используйте OpenAPI с его домена, чтобы видеть актуальный контракт именно этой установки.
