# Filters

Filters use query parameters:

```text
filter[name]=value
```

## Common suffixes

| Suffix | Meaning |
| --- | --- |
| `_from` | Greater than or equal. |
| `_to` | Less than or equal. |
| `_min` | Numeric minimum. |
| `_max` | Numeric maximum. |

## Routes

| Filter | Example |
| --- | --- |
| `id` | `filter[id]=25` |
| `from_currency_id` | `filter[from_currency_id]=1` |
| `to_currency_id` | `filter[to_currency_id]=2` |
| `from` | `filter[from]=USDT` |
| `to` | `filter[to]=BTC` |
| `from_code` | `filter[from_code]=USDT` |
| `to_code` | `filter[to_code]=BTC` |
| `status` | `filter[status]=active` |

## Payment systems

| Filter | Example |
| --- | --- |
| `side` | `filter[side]=give` |
| `currency_code` | `filter[currency_code]=USDT` |
| `network` | `filter[network]=TRC20` |
| `payment` | `filter[payment]=Tether` |
| `from_currency_id` | `filter[from_currency_id]=1` |
| `to_currency_id` | `filter[to_currency_id]=2` |

## Orders

| Filter | Example |
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

## Partner

Referral filters:

| Filter | Example |
| --- | --- |
| `client_id` | `filter[client_id]=42` |
| `client_email` | `filter[client_email]=client@example.net` |
| `created_from` | `filter[created_from]=2026-06-01` |
| `created_to` | `filter[created_to]=2026-06-23` |

Partner exchange filters:

| Filter | Example |
| --- | --- |
| `order_id` | `filter[order_id]=913` |
| `status` | `filter[status]=completed` |
| `bonus_min` | `filter[bonus_min]=10` |
| `bonus_max` | `filter[bonus_max]=100` |

Payout filters:

| Filter | Example |
| --- | --- |
| `status` | `filter[status]=paid` |
| `currency` | `filter[currency]=USDT` |
| `amount_min` | `filter[amount_min]=50` |
| `amount_max` | `filter[amount_max]=500` |

## Reviews

| Filter | Example |
| --- | --- |
| `rating` | `filter[rating]=5` |
| `status` | `filter[status]=published` |
| `created_from` | `filter[created_from]=2026-06-01` |
| `created_to` | `filter[created_to]=2026-06-23` |

