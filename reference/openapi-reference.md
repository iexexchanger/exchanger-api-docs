# Как подключен OpenAPI

OpenAPI specification описывает endpoints, параметры, body, headers и ответы API в машинно-читаемом формате. В этой документации OpenAPI используется двумя способами:

- как файл `openapi/openapi.yaml` в GitHub-репозитории;
- как GitBook OpenAPI blocks на страницах раздела [Интерактивный API Reference](../api-reference/exchange.md).

GitBook превращает OpenAPI operations в интерактивные blocks: разработчик видит method, path, параметры, body, responses и может тестировать endpoint прямо на странице.

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

Raw URL текущей GitHub-версии:

```text
https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml
```

## Что уже сделано в этой документации

В `SUMMARY.md` добавлен раздел:

```text
Интерактивный API Reference
```

В нем находятся страницы с GitBook OpenAPI blocks:

| Страница | Что показывает |
| --- | --- |
| `api-reference/system-client.md` | Ping, health, client, usage. |
| `api-reference/exchange.md` | Направления, quote, preflight, создание заявки, статус, confirm/cancel. |
| `api-reference/orders.md` | Справочник статусов, список заявок, одна заявка. |
| `api-reference/files-verifications.md` | Upload intents, файлы, identity/card verification. |
| `api-reference/webhooks.md` | Webhook endpoints, test, events, deliveries, retry. |
| `api-reference/partner-reviews-sandbox.md` | Partner, reviews, sandbox. |

## Пример OpenAPI block

В Markdown используется GitBook-синтаксис:

```md
{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/orders" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}
```

GitBook должен отрендерить этот блок как интерактивную карточку endpoint-а.

## Как добавить spec в GitBook UI

Если нужно подключить OpenAPI на уровне GitBook organization:

1. Откройте в GitBook раздел `OpenAPI`.
2. Нажмите `Add specification`.
3. Укажите имя, например `iexexchanger-api`.
4. Выберите источник:
   - upload файла `openapi/openapi.yaml`;
   - URL `https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml`;
   - live URL `https://{your-domain}/api/v3/openapi.yaml`.
5. После добавления spec вставьте `OpenAPI Reference` в table of contents.

Если spec подключен по URL, GitBook может проверять обновления автоматически. Для live URL на домене обменника нужно разрешить CORS `GET` с домена опубликованной документации.

## CLI-вариант

Официальный GitBook CLI позволяет публиковать или обновлять spec командой:

```bash
gitbook openapi publish \
  --spec iexexchanger-api \
  --organization ORGANIZATION_ID \
  https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml
```

Этот вариант удобен для CI/CD: после обновления `openapi/openapi.yaml` pipeline публикует новую версию spec в GitBook.

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
