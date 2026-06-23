# Список заявок

Orders API нужен для чтения списка заявок, отчетов, CRM-синхронизации и support-панелей.

## Получить статусы

```bash
curl -sS https://example.com/api/v3/private/orders/statuses \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Публичный справочник:

```bash
curl -sS https://example.com/api/v3/public/orders/statuses \
  -H "Accept: application/json"
```

## Получить список заявок

```bash
curl -sS "https://example.com/api/v3/private/orders?filter[status]=processing&sort=-created_at&page=1&per_page=50" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Полезные фильтры

| Фильтр | Пример |
| --- | --- |
| `status` | `filter[status]=processing` |
| `public_id` | `filter[public_id]=EX-000913` |
| `tracking_id` | `filter[tracking_id]=TRK8K2LQ` |
| `created_from` | `filter[created_from]=2026-06-01` |
| `created_to` | `filter[created_to]=2026-06-23` |
| `amount_min` | `filter[amount_min]=100` |
| `amount_max` | `filter[amount_max]=1000` |

## Получить одну заявку

```bash
curl -sS https://example.com/api/v3/private/orders/TRK8K2LQ \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`{order}` может быть numeric ID, `public_id` или `tracking_id`.

Для активного exchange flow чаще используйте endpoints из раздела [Статусы и действия по заявке](../exchange/order-actions-statuses.md).

Точные параметры списков и responses доступны на странице [Orders API Reference](../api-reference/orders.md).
