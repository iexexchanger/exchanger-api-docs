# Partner

Partner endpoints are read-only and return partner account data for the authenticated client.

## Partner summary

```bash
curl -sS https://example.com/api/v3/private/partner \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Statistics

```bash
curl -sS "https://example.com/api/v3/private/partner/statistics?period=month" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Referrals

```bash
curl -sS "https://example.com/api/v3/private/partner/referrals?page=1&per_page=50" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Exchanges

```bash
curl -sS "https://example.com/api/v3/private/partner/exchanges?filter[created_from]=2026-06-01" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Payouts

```bash
curl -sS "https://example.com/api/v3/private/partner/payouts?filter[status]=paid" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Legacy aliases

Some integrations may use account-prefixed aliases:

```text
GET /private/account/partner
GET /private/account/partner/statistics
GET /private/account/partner/referrals
GET /private/account/partner/exchanges
GET /private/account/partner/payouts
```

For new integrations, prefer `/private/partner/*`.

