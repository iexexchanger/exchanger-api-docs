# Order status and actions

После создания заявки интеграция должна отслеживать статус и показывать пользователю доступные действия.

## Get order

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`{order}` может быть:

- numeric `id`;
- `public_id`;
- `tracking_id`.

API возвращает только заявки текущего клиента.

## Get status

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ/status \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Typical response:

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

## Get available actions

```bash
curl -sS https://example.com/api/v3/private/exchange/orders/TRK8K2LQ/actions \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Actions can include:

| Action | Meaning |
| --- | --- |
| `confirm_payment` | Пользователь может подтвердить оплату. |
| `cancel` | Заявку можно отменить. |
| `upload_file` | Нужно загрузить файл. |
| `submit_verification` | Нужна верификация. |

## Confirm payment

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

Optional fields:

| Field | Description |
| --- | --- |
| `income_code` | Payment code, if direction requires it. |
| `num_tx` | Transaction hash or payment reference. |
| `note_tx` | Comment from integration. |

## Cancel order

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

Cancellation is only available while the order is not final.

## Webhooks vs polling

Use webhooks as the primary status channel:

- `order.created`;
- `order.status_changed`;
- `order.payment_received`.

Use status polling only when:

- webhook endpoint is temporarily unavailable;
- user is actively viewing the order page;
- you need manual reconciliation.

