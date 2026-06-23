# Файлы и верификации

Некоторые направления требуют документ, проверку карты или дополнительный файл. Для этого используется upload intent: сначала API создает намерение загрузки, затем интеграция отправляет файл.

## Общий сценарий

```text
create upload intent -> upload file -> commit -> submit verification
```

## Создать upload intent

```bash
curl -sS https://example.com/api/v3/private/files/upload-intents \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "purpose": "identity_verification",
    "filename": "passport.jpg",
    "content_type": "image/jpeg",
    "size": 245901
  }'
```

| Purpose | Для чего |
| --- | --- |
| `identity_verification` | Документ для проверки личности. |
| `card_verification` | Проверка банковской карты. |
| `order_attachment` | Файл к заявке. |
| `sandbox` | Тестовая загрузка. |

## Загрузить файл

```bash
FILE_SHA=$(sha256sum passport.jpg | awk '{print $1}')

curl -sS https://example.com/api/v3/private/files/upload-intents/UPLOAD_INTENT_ID/commit \
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
    "upload_intent_id": "UPLOAD_INTENT_ID",
    "document_type": "passport",
    "first_name": "John",
    "last_name": "Smith"
  }'
```

## Отправить card verification

```bash
curl -sS https://example.com/api/v3/private/verifications/cards \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "upload_intent_id": "UPLOAD_INTENT_ID",
    "card_mask": "411111******1111",
    "cardholder_name": "JOHN SMITH"
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

