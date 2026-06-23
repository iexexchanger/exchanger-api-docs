# Import to GitBook

Эта документация подготовлена как обычный GitHub repository для GitBook Git Sync.

## Файлы

| Файл | Назначение |
| --- | --- |
| `.gitbook.yaml` | Говорит GitBook читать документацию из корня репозитория. |
| `README.md` | Главная страница. |
| `SUMMARY.md` | Структура sidebar. |
| `start/`, `setup/`, `architecture/`, `exchange/`, `webhooks/`, `resources/`, `reference/` | Markdown-разделы документации. |
| `openapi/openapi.yaml` | OpenAPI specification для импорта в GitBook API Reference. |
| `sdk/php/PublicApiSigner.php` | PHP helper для HMAC-подписи запросов. |
| `sdk/typescript/PublicApiClient.ts` | TypeScript client/helper для интеграции. |

В репозиторий документации не нужно добавлять файлы реализации API. Допустимы только публичные developer artifacts: OpenAPI specification и SDK/helper-файлы, которые интегратор может использовать напрямую.

## Подключение GitHub Sync

1. Создайте GitHub repository с этими Markdown-файлами.
2. В GitBook откройте space для API-документации.
3. Подключите GitHub Sync к repository.
4. Проверьте, что sidebar повторяет `SUMMARY.md`.
5. Для API Reference добавьте OpenAPI specification из файла `openapi/openapi.yaml` или по URL:

   ```text
   https://{your-domain}/api/v3/openapi.yaml
   ```

Если у вас несколько окружений, заведите отдельные GitBook spaces или variants и используйте реальные домены этих окружений:

| Окружение | OpenAPI URL |
| --- | --- |
| Demo | `https://{demo-domain}/api/v3/openapi.yaml` |
| Staging | `https://{staging-domain}/api/v3/openapi.yaml` |
| Production | `https://{production-domain}/api/v3/openapi.yaml` |

## Рекомендуемый процесс обновления

1. Обновите Markdown-страницы в GitHub.
2. Проверьте ссылки в `SUMMARY.md`.
3. Синхронизируйте GitBook.
4. Проверьте, что live OpenAPI URL открывается и API Reference обновилась.
5. Для важных изменений добавьте короткий changelog: что изменилось, кому нужно обновиться, есть ли breaking changes.

Полезные страницы GitBook:

- [Content configuration](https://gitbook.com/docs/getting-started/git-sync/content-configuration)
- [OpenAPI](https://gitbook.com/docs/api-references/openapi)
- [Structuring your API reference](https://gitbook.com/docs/api-references/guides/structuring-your-api-reference)
