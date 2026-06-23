# Files and verifications

Некоторые направления требуют identity verification, card verification или дополнительные файлы. API использует upload intents: сначала создается намерение загрузки, затем файл отправляется и привязывается к проверке.

## Upload flow

```text
create upload intent -> upload file -> commit -> submit verification
```

## Create upload intent

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

Common purposes:

| Purpose | Use |
| --- | --- |
| `identity_verification` | Passport, ID, proof of identity. |
| `card_verification` | Bank card proof. |
| `order_attachment` | File attached to a specific order. |
| `sandbox` | Test upload in sandbox flows. |

## Commit upload

```bash
FILE_SHA=$(sha256sum passport.jpg | awk '{print $1}')

curl -sS https://example.com/api/v3/private/files/upload-intents/UPLOAD_INTENT_ID/commit \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "X-Api-File-Sha256: $FILE_SHA" \
  -F "file=@passport.jpg"
```

If HMAC is enabled for upload, sign the request using `X-Api-File-Sha256` as the body hash.

## Get verification requirements

```bash
curl -sS "https://example.com/api/v3/private/verifications/requirements?route_id=25" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Requirements tell the integration what the user must pass before or during order creation.

## Submit identity verification

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

## Submit card verification

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

## Statuses

| Status | Meaning |
| --- | --- |
| `not_submitted` | Пользователь еще не отправил данные. |
| `pending` | Проверка ожидает обработки. |
| `approved` | Проверка пройдена. |
| `rejected` | Проверка отклонена, нужно исправить данные. |

## Recommendations

- Показывайте пользователю requirements до создания заявки.
- Не загружайте файлы без purpose.
- Проверяйте размер и тип файла на своей стороне до upload.
- Используйте webhooks для изменения статуса проверки.
- Не храните документы дольше, чем требует ваш продукт и закон.

