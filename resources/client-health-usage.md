# Client, health and usage

Эти endpoints помогают проверить доступ, профиль клиента и расход API.

## Private ping

```bash
curl -sS https://example.com/api/v3/private/ping \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Client health

```bash
curl -sS https://example.com/api/v3/private/health/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Use this endpoint after key creation, rotation or deployment.

Typical response:

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

## Client profile

```bash
curl -sS https://example.com/api/v3/private/client \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Alias:

```text
GET /private/account
```

## Usage

```bash
curl -sS "https://example.com/api/v3/private/usage?period=day" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Use usage data to show:

- total requests;
- errors;
- billable units;
- daily quota;
- monthly quota;
- current token status.

