# Клиент, health и usage

Эти endpoints помогают проверить доступ клиента, состояние ключа и расход API.

## Приватный ping

```bash
curl -sS https://example.com/api/v3/private/ping \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Проверить состояние клиента

```bash
curl -sS https://example.com/api/v3/private/health/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Пример:

```json
{
  "state": 0,
  "result": {
    "client": {
      "status": "active",
      "api_access": true
    },
    "token": {
      "status": "active",
      "hmac_required": true
    },
    "limits": {
      "daily_remaining": 9984,
      "monthly_remaining": 299120
    }
  }
}
```

## Профиль клиента

```bash
curl -sS https://example.com/api/v3/private/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Usage

```bash
curl -sS "https://example.com/api/v3/private/usage?period=day" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Используйте usage, чтобы показывать клиенту расход API, ошибки и остаток дневной/месячной quota.
