# OpenAPI и SDK

OpenAPI specification описывает endpoints, параметры, body, headers и ответы API в машинно-читаемом формате. Его можно использовать в GitBook, Postman, Insomnia, Swagger UI и генераторах клиентов.

## Где находится OpenAPI

В репозитории документации:

```text
openapi/openapi.yaml
```

На установленном обменнике:

```text
https://{your-domain}/api/v3/openapi.yaml
```

Пример:

```text
https://example.com/api/v3/openapi.yaml
```

## Как использовать в GitBook

GitBook умеет строить интерактивный API Reference из OpenAPI. Для этого можно подключить файл из репозитория или URL live specification.

| Вариант | Когда использовать |
| --- | --- |
| `openapi/openapi.yaml` | Документация синхронизируется из GitHub и спецификация лежит рядом с Markdown. |
| `https://{your-domain}/api/v3/openapi.yaml` | GitBook должен читать актуальную спецификацию прямо с установки. |

## Как использовать через GitBook API

GitBook API также позволяет управлять OpenAPI specifications программно. Это полезно, если вы хотите обновлять API Reference из CI/CD.

Создание OpenAPI spec из URL:

```bash
curl -sS https://api.gitbook.com/v1/orgs/ORGANIZATION_ID/openapi \
  -H "Authorization: Bearer GITBOOK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "iexexchanger-api",
    "source": {
      "url": "https://example.com/api/v3/openapi.yaml"
    }
  }'
```

Обновление существующей spec:

```bash
curl -sS https://api.gitbook.com/v1/orgs/ORGANIZATION_ID/openapi/iexexchanger-api \
  -X PUT \
  -H "Authorization: Bearer GITBOOK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "source": {
      "url": "https://example.com/api/v3/openapi.yaml"
    }
  }'
```

Для обычного клиента это не требуется. Это инструмент для тех, кто поддерживает GitBook-документацию.

## SDK-файлы

В репозитории есть готовые helper-файлы:

| Файл | Для чего нужен |
| --- | --- |
| `sdk/php/PublicApiSigner.php` | Подписывать HMAC-запросы в PHP. |
| `sdk/typescript/PublicApiClient.ts` | Делать запросы к API из TypeScript/Node.js. |

Готовые примеры:

- [PHP: подпись HMAC и запрос](../examples/php-signed-request.md)
- [TypeScript: SDK-клиент](../examples/typescript-client.md)

## Как разделять Markdown и API Reference

Markdown-страницы объясняют сценарии: как получить ключ, как создать заявку, как подключить webhook.

OpenAPI Reference нужна как точный справочник endpoint-ов: параметры, body, responses, security, schemas.
