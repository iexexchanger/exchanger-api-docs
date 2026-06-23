# Файлы и верификации

Некоторые направления требуют документ, проверку карты или дополнительный файл. Для этого используется upload intent: сначала API создает намерение загрузки, затем интеграция отправляет файл.

## Общий сценарий

```text
create upload intent -> commit file -> submit verification
```

## Создать upload intent

```bash
curl -sS https://example.com/api/v3/private/files/upload-intents \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "purpose": "identity_verification",
    "allowed_extensions": ["jpg", "jpeg", "png", "pdf"],
    "max_bytes": 5242880
  }'
```

| Тип файла | Для чего |
| --- | --- |
| `identity_verification` | Документ для проверки личности. |
| `card_verification` | Проверка банковской карты. |
| `order_attachment` | Файл к заявке. |
| `sandbox` | Тестовая загрузка. |

## Загрузить файл

```bash
FILE_SHA=$(sha256sum passport.jpg | awk '{print $1}')

curl -sS https://example.com/api/v3/private/files/upload-intents/UPLOAD_INTENT_UUID/commit \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "X-Api-File-Sha256: $FILE_SHA" \
  -F "file=@passport.jpg"
```

Если для upload включен HMAC, используйте `X-Api-File-Sha256` как body hash при подписи.

## Получить требования к верификации

```bash
curl -sS "https://example.com/api/v3/private/verifications/requirements?route_id=25" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Отправить identity verification

```bash
curl -sS https://example.com/api/v3/private/verifications/identity \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "full_name": "John Smith",
    "file_intents": ["UPLOAD_INTENT_UUID"]
  }'
```

## Отправить card verification

```bash
curl -sS https://example.com/api/v3/private/verifications/cards \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "order_id": "TRK8K2LQ",
    "currency_id": 1,
    "card_number": "4111111111111111",
    "name": "JOHN SMITH",
    "file_intent": "UPLOAD_INTENT_UUID"
  }'
```

## Статусы проверки

| Статус | Что означает |
| --- | --- |
| `not_submitted` | Данные еще не отправлены. |
| `pending` | Проверка ожидает обработки. |
| `approved` | Проверка пройдена. |
| `rejected` | Проверка отклонена. |

## Рекомендации

- Показывайте требования до создания заявки.
- Проверяйте тип и размер файла на своей стороне.
- Не храните документы дольше, чем нужно.
- Используйте webhooks для изменения статуса проверки.

## API Reference

Точные request body и responses доступны отдельно:

- [Files API Reference](../api-reference/files.md)
- [Verifications API Reference](../api-reference/verifications.md)
