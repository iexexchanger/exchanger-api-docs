# Статусы и действия по заявке

После создания заявки интеграция должна показывать статус и доступные действия.

## Получить заявку

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Вместо `{order}` можно передать:

- numeric `id`;
- `public_id`;
- `tracking_id`.

API возвращает только заявки текущего клиента.

## Получить статус

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ/status \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Пример:

```json
{
  "state": 0,
  "result": {
    "order": {
      "tracking_id": "TRK8K2LQ",
      "status": "processing",
      "status_label": "Processing",
      "is_final": false
    }
  }
}
```

## Получить доступные действия

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ/actions \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

| Действие | Что означает |
| --- | --- |
| `confirm_payment` | Пользователь может подтвердить оплату. |
| `cancel` | Заявку можно отменить. |
| `upload_file` | Нужно загрузить файл. |
| `submit_verification` | Нужна верификация. |

## Подтвердить оплату

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ/confirm \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: confirm-TRK8K2LQ-001" \
  -d '{
    "type": "paid",
    "num_tx": "0xabc...",
    "note_tx": "Paid from customer wallet"
  }'
```

## Отменить заявку

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ/cancel \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: cancel-TRK8K2LQ-001" \
  -d '{
    "reason": "User cancelled checkout"
  }'
```

Отмена доступна только пока заявка не финальная.

## Webhooks или polling

Основной способ узнавать изменения статуса: webhook `order.status_changed`.

Status endpoint используйте:

- когда пользователь прямо сейчас смотрит страницу заявки;
- если webhook временно недоступен;
- для ручной сверки.

