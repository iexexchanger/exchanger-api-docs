# Возможности направления

`capabilities` показывает, что можно сделать с направлением прямо сейчас и какие поля нужны для заявки.

```bash
curl -sS https://example.com/api/v3/private/exchange/routes/25/capabilities \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Что смотреть в ответе

| Блок | Что означает |
| --- | --- |
| `available` | Доступно ли направление. |
| `actions` | Какие действия разрешены: quote, preflight, create order, confirm, cancel. |
| `amounts` | Минимальная и максимальная сумма. |
| `rate_modes` | Поддерживается fixed или floating курс. |
| `fields` | Базовые поля заявки. |
| `dynamic_fields` | Дополнительные поля направления. |
| `requirements` | Требования к identity/card/file verification. |
| `endpoints` | Какие endpoints вызывать дальше. |
| `snapshot` | Снимок условий направления. |

## Пример ответа

```json
{
  "state": 0,
  "message": "OK",
  "result": {
    "route_id": 25,
    "available": true,
    "actions": {
      "quote": true,
      "preflight": true,
      "create_order": true
    },
    "amounts": {
      "min": "50",
      "max": "10000"
    },
    "rate_modes": ["fixed", "floating"],
    "fields": [
      {
        "name": "income_account",
        "required": true,
        "label": "Wallet address"
      }
    ]
  }
}
```

## Как использовать в интерфейсе

| Данные из API | Что делать в UI |
| --- | --- |
| `amounts.min/max` | Проверять сумму до расчета. |
| `rate_modes` | Показывать выбор fixed/floating только если доступны оба режима. |
| `fields.required` | Помечать обязательные поля. |
| `dynamic_fields` | Рисовать дополнительные поля без hardcode. |
| `requirements.identity` | Попросить пользователя пройти проверку личности. |
| `requirements.card` | Попросить верифицировать карту. |

## Details или capabilities: что выбрать

| Endpoint | Когда использовать |
| --- | --- |
| `/details` | Нужно показать описание направления, курс, лимиты, условия. |
| `/capabilities` | Нужно построить форму и понять, можно ли создать заявку. |

Для формы заявки обычно нужны оба endpoint.
