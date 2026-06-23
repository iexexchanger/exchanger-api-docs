# Public XML rates

`GET /public/rates.xml` returns exchange rates in XML format.

```bash
curl -sS https://example.com/api/v3/public/rates.xml
```

This endpoint is public and does not use JSON envelope.

## When to use

Use XML rates for:

- monitoring services;
- external catalogs;
- legacy integrations;
- simple public rate export.

For interactive exchange forms, use private exchange endpoints instead:

- `GET /private/exchange/payment-systems`;
- `GET /private/exchange/routes`;
- `GET /private/exchange/routes/{route}/details`;
- `POST /private/exchange/quotes`.

## Example shape

The exact XML structure depends on the exchange export format. Treat it as a public feed, not as a replacement for private route capabilities.

