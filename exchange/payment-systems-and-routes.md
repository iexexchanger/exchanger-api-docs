# Payment systems and routes

Payment systems описывают доступные валюты и способы оплаты. Routes описывают конкретные направления обмена между двумя сторонами.

## Get payment systems

```bash
curl -sS "https://example.com/api/v3/private/exchange/payment-systems?filter[side]=give" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Useful filters:

| Filter | Example | Meaning |
| --- | --- | --- |
| `side` | `filter[side]=give` | Валюты для стороны отдачи. |
| `side` | `filter[side]=receive` | Валюты для стороны получения. |
| `currency_code` | `filter[currency_code]=USDT` | Код валюты. |
| `network` | `filter[network]=TRC20` | Сеть или стандарт, если используется. |
| `payment` | `filter[payment]=Tether` | Название платежной системы. |

Response shape зависит от настроек обменника, но обычно содержит:

```json
{
  "state": 0,
  "result": {
    "data": [
      {
        "id": 1,
        "currency_code": "USDT",
        "network": "TRC20",
        "payment": "Tether",
        "side": "give"
      }
    ]
  }
}
```

## Get routes

```bash
curl -sS "https://example.com/api/v3/private/exchange/routes?filter[from_currency_id]=1&filter[to_currency_id]=2" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Useful filters:

| Filter | Example |
| --- | --- |
| `from_currency_id` | `filter[from_currency_id]=1` |
| `to_currency_id` | `filter[to_currency_id]=2` |
| `from_code` | `filter[from_code]=USDT` |
| `to_code` | `filter[to_code]=BTC` |
| `status` | `filter[status]=active` |

Typical route fields:

```json
{
  "id": 25,
  "from": {
    "currency_code": "USDT",
    "network": "TRC20"
  },
  "to": {
    "currency_code": "BTC"
  },
  "rate": "0.00001020",
  "limits": {
    "min": "50",
    "max": "10000"
  }
}
```

## UI recommendations

- Сначала покажите пользователю сторону отдачи.
- После выбора отдачи загрузите доступные варианты получения.
- После выбора пары загрузите routes.
- Не показывайте направления, которые API не возвращает как активные.
- Если несколько routes подходят под одну пару, показывайте сеть, лимиты, reserve и rate mode.

## Caching

Payment systems и routes можно кэшировать на короткое время, например 30-120 секунд. Не кэшируйте их на часы: резервы, лимиты, статусы и доступность направлений могут меняться.

