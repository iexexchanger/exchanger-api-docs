# Route capabilities

`capabilities` отвечает на вопрос: что можно сделать с направлением прямо сейчас и какие данные нужны для заявки.

```bash
curl -sS https://example.com/api/v3/private/exchange/routes/25/capabilities \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## What capabilities include

| Block | Meaning |
| --- | --- |
| `available` | Можно ли использовать направление. |
| `actions` | Какие действия доступны: quote, preflight, create, confirm, cancel. |
| `amounts` | Минимальная и максимальная сумма. |
| `rate_modes` | Fixed/floating support. |
| `fields` | Базовые поля заявки. |
| `dynamic_fields` | Дополнительные поля, настроенные для направления. |
| `requirements` | Identity/card/file requirements. |
| `endpoints` | Какие endpoints вызывать дальше. |
| `snapshot` | Снимок условий направления. |

## Example response fragment

```json
{
  "state": 0,
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
    ],
    "requirements": {
      "identity": "not_required",
      "card": "required_if_card_payment"
    }
  }
}
```

## How to use capabilities in UI

Use `capabilities` to build the form dynamically:

| API data | UI behavior |
| --- | --- |
| `amounts.min/max` | Validate amount before quote. |
| `rate_modes` | Show fixed/floating selector only when both are available. |
| `fields.required` | Mark required inputs. |
| `dynamic_fields` | Render extra fields from API instead of hardcoding. |
| `requirements.identity` | Ask user to pass identity verification before order. |
| `requirements.card` | Ask for card verification or uploaded card file. |

## Details vs capabilities

| Endpoint | Use when |
| --- | --- |
| `/details` | Нужно показать описание направления, курс, лимиты, текстовые условия, публичную карточку route. |
| `/capabilities` | Нужно понять, какие действия и поля доступны для создания заявки. |

Для формы заявки обычно нужны оба endpoint-а: `details` для отображения условий и `capabilities` для бизнес-логики.

