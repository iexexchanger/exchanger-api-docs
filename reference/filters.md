# Фильтры списков

Фильтры передаются в query string в формате:

```text
filter[name]=value
```

Пример:

```text
?filter[status]=processing&filter[created_from]=2026-06-01
```

## Общие суффиксы

| Суффикс | Что означает |
| --- | --- |
| `_from` | От даты или значения. |
| `_to` | До даты или значения. |
| `_min` | Минимальное число. |
| `_max` | Максимальное число. |

## Направления обмена

| Фильтр | Пример |
| --- | --- |
| `id` | `filter[id]=25` |
| `from_currency_id` | `filter[from_currency_id]=1` |
| `to_currency_id` | `filter[to_currency_id]=2` |
| `from` | `filter[from]=USDT` |
| `to` | `filter[to]=BTC` |
| `from_code` | `filter[from_code]=USDT` |
| `to_code` | `filter[to_code]=BTC` |
| `status` | `filter[status]=active` |

## Платежные системы

| Фильтр | Пример |
| --- | --- |
| `side` | `filter[side]=give` |
| `currency_code` | `filter[currency_code]=USDT` |
| `network` | `filter[network]=TRC20` |
| `payment` | `filter[payment]=Tether` |
| `from_currency_id` | `filter[from_currency_id]=1` |
| `to_currency_id` | `filter[to_currency_id]=2` |

## Заявки

| Фильтр | Пример |
| --- | --- |
| `id` | `filter[id]=913` |
| `public_id` | `filter[public_id]=EX-000913` |
| `tracking_id` | `filter[tracking_id]=TRK8K2LQ` |
| `email` | `filter[email]=client@example.net` |
| `status` | `filter[status]=processing` |
| `status_id` | `filter[status_id]=2` |
| `created_from` | `filter[created_from]=2026-06-01` |
| `created_to` | `filter[created_to]=2026-06-23` |
| `amount_min` | `filter[amount_min]=100` |
| `amount_max` | `filter[amount_max]=1000` |

## Партнерские данные

Рефералы:

| Фильтр | Пример |
| --- | --- |
| `client_id` | `filter[client_id]=42` |
| `client_email` | `filter[client_email]=client@example.net` |
| `created_from` | `filter[created_from]=2026-06-01` |
| `created_to` | `filter[created_to]=2026-06-23` |

Партнерские обмены:

| Фильтр | Пример |
| --- | --- |
| `order_id` | `filter[order_id]=913` |
| `status` | `filter[status]=completed` |
| `bonus_min` | `filter[bonus_min]=10` |
| `bonus_max` | `filter[bonus_max]=100` |

Выплаты:

| Фильтр | Пример |
| --- | --- |
| `status` | `filter[status]=paid` |
| `currency` | `filter[currency]=USDT` |
| `amount_min` | `filter[amount_min]=50` |
| `amount_max` | `filter[amount_max]=500` |

## Отзывы

| Фильтр | Пример |
| --- | --- |
| `rating` | `filter[rating]=5` |
| `status` | `filter[status]=published` |
| `created_from` | `filter[created_from]=2026-06-01` |
| `created_to` | `filter[created_to]=2026-06-23` |

