# Платежные системы и направления

Платежные системы отвечают за то, что пользователь может отдать и получить. Направления отвечают за конкретную пару обмена.

## Получить платежные системы

Сторона отдачи:

```bash
curl -sS "https://example.com/api/v3/private/exchange/payment-systems?filter[side]=give" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Сторона получения:

```bash
curl -sS "https://example.com/api/v3/private/exchange/payment-systems?filter[side]=receive" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Пример элемента:

```json
{
  "id": 1,
  "currency_code": "USDT",
  "network": "TRC20",
  "payment": "Tether",
  "side": "give"
}
```

## Полезные фильтры

| Фильтр | Пример | Для чего |
| --- | --- | --- |
| `side` | `filter[side]=give` | Показать сторону отдачи. |
| `side` | `filter[side]=receive` | Показать сторону получения. |
| `currency_code` | `filter[currency_code]=USDT` | Найти валюту по коду. |
| `network` | `filter[network]=TRC20` | Отфильтровать сеть. |
| `payment` | `filter[payment]=Tether` | Найти платежную систему по названию. |

## Получить направления

```bash
curl -sS "https://example.com/api/v3/private/exchange/routes?filter[from_currency_id]=1&filter[to_currency_id]=2" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Пример направления:

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

## Как строить форму обмена

1. Показать пользователю список валют отдачи.
2. После выбора отдачи загрузить доступные валюты получения.
3. После выбора пары найти направления.
4. Если направлений несколько, показать сеть, лимиты, курс и резерв.
5. Для выбранного направления вызвать `capabilities`.

Не показывайте пользователю направление, если API не возвращает его как доступное.

