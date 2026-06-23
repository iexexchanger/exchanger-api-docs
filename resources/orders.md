# Orders

Orders API позволяет читать список заявок и детали заявок текущего клиента.

## Get statuses

```bash
curl -sS https://example.com/api/v3/private/orders/statuses \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Public status catalog:

```bash
curl -sS https://example.com/api/v3/public/orders/statuses \
  -H "Accept: application/json"
```

## List orders

```bash
curl -sS "https://example.com/api/v3/private/orders?filter[status]=processing&sort=-created_at&page=1&per_page=50" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Useful filters:

| Filter | Example |
| --- | --- |
| `status` | `filter[status]=processing` |
| `public_id` | `filter[public_id]=EX-000913` |
| `tracking_id` | `filter[tracking_id]=TRK8K2LQ` |
| `created_from` | `filter[created_from]=2026-06-01` |
| `created_to` | `filter[created_to]=2026-06-23` |
| `amount_min` | `filter[amount_min]=100` |
| `amount_max` | `filter[amount_max]=1000` |

## Get order

```bash
curl -sS https://example.com/api/v3/private/orders/TRK8K2LQ \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`{order}` can be numeric ID, public ID or tracking ID.

## Public exchange order endpoints

For active exchange flow use:

- `GET /private/exchange/orders/{order}`;
- `GET /private/exchange/orders/{order}/status`;
- `GET /private/exchange/orders/{order}/actions`;
- `POST /private/exchange/orders/{order}/confirm`;
- `POST /private/exchange/orders/{order}/cancel`.

The generic Orders API is better for lists, reports and CRM sync.

