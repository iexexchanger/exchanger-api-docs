# Base URL and versioning

Все endpoints находятся под `/api/v3`. В большинстве установок API доступен на основном домене обменника.

```text
https://{your-domain}/api/v3
```

Пример:

```text
https://example.com/api/v3
```

Если владелец обменника выдал отдельный backend-домен, используйте его. Не добавляйте `app.` автоматически.

## Public and private endpoints

| Type | Prefix | Auth |
| --- | --- | --- |
| Public | `/api/v3/public/*` | Не требуется |
| Private | `/api/v3/private/*` | Bearer token |
| System ping | `/api/v3/ping` | Не требуется |
| OpenAPI | `/api/v3/openapi.yaml` | Не требуется |

## Version

Версия API закреплена в URL:

```text
/api/v3
```

Ответы также могут содержать version headers:

```http
X-Api-Version: v3
X-Api-Envelope-Version: v1
X-Api-Error-Version: v1
X-Api-Webhook-Payload-Version: v1
```

Для стабильной интеграции:

- не строите URL без `/api/v3`;
- не полагайтесь на порядок полей JSON;
- используйте `request_id` при обращении в support;
- перед breaking changes проверяйте OpenAPI reference.

## Environments

Рекомендуется иметь отдельные ключи для каждого окружения:

| Environment | Base URL | Key |
| --- | --- | --- |
| Demo | `https://{demo-domain}/api/v3` | Demo key |
| Staging | `https://{staging-domain}/api/v3` | Staging key |
| Production | `https://{production-domain}/api/v3` | Production key |
