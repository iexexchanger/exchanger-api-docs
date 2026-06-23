# Endpoint matrix

All paths below are relative to:

```text
https://example.com/api/v3
```

## Public

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/ping` | Public health check. |
| `GET` | `/openapi.yaml` | OpenAPI specification. |
| `GET` | `/public/contracts` | Public contract registry. |
| `GET` | `/public/contracts/{contract}` | One public contract. |
| `GET` | `/public/schemas` | Public schema registry. |
| `GET` | `/public/schemas/{schema}` | One public schema. |
| `GET` | `/public/rates.xml` | Public XML rates. |
| `GET` | `/public/orders/statuses` | Public order status catalog. |

## Health, client and usage

| Method | Path | Scope |
| --- | --- | --- |
| `GET` | `/private/ping` | Any active key |
| `GET` | `/private/health` | Any active key |
| `GET` | `/private/health/client` | `client:health:read` |
| `GET` | `/private/client` | `public-api:client:read` |
| `GET` | `/private/account` | `public-api:client:read` |
| `GET` | `/private/usage` | `usage:read` |
| `GET` | `/private/scopes` | `scopes:read` |

## Exchange

| Method | Path | Scope |
| --- | --- | --- |
| `GET` | `/private/exchange/payment-systems` | `exchange:routes:read` |
| `GET` | `/private/exchange/routes` | `exchange:routes:read` |
| `GET` | `/private/exchange/routes/details` | `exchange:routes:read` |
| `GET` | `/private/exchange/routes/{from}/{to}/details` | `exchange:routes:read` |
| `GET` | `/private/exchange/routes/{from}/{to}/capabilities` | `exchange:capabilities:read` |
| `GET` | `/private/exchange/routes/{route}` | `exchange:routes:read` |
| `GET` | `/private/exchange/routes/{route}/details` | `exchange:routes:read` |
| `GET` | `/private/exchange/routes/{route}/capabilities` | `exchange:capabilities:read` |
| `POST` | `/private/exchange/quotes` | `exchange:quotes:read` |
| `POST` | `/private/exchange/orders/preflight` | `exchange:preflight:read` |
| `POST` | `/private/exchange/orders` | `exchange:orders:create` |
| `GET` | `/private/exchange/orders/{order}` | `orders:detail:read` |
| `GET` | `/private/exchange/orders/{order}/actions` | `exchange:orders:actions:read` |
| `GET` | `/private/exchange/orders/{order}/status` | `orders:detail:read` |
| `POST` | `/private/exchange/orders/{order}/confirm` | `exchange:orders:confirm` |
| `POST` | `/private/exchange/orders/{order}/cancel` | `exchange:orders:cancel` |
| `DELETE` | `/private/exchange/orders/{order}` | `exchange:orders:cancel` |

## Files and verifications

| Method | Path | Scope |
| --- | --- | --- |
| `POST` | `/private/files/upload-intents` | `files:write` |
| `GET` | `/private/files/upload-intents/{intent}` | `files:read` |
| `POST` | `/private/files/upload-intents/{intent}/commit` | `files:write` |
| `GET` | `/private/exchange/orders/{order}/verifications` | `verifications:read` |
| `POST` | `/private/exchange/orders/{order}/verifications/submit` | `verifications:write` |
| `GET` | `/private/verifications/requirements` | `verifications:read` |
| `POST` | `/private/verifications/identity` | `verifications:write` |
| `GET` | `/private/verifications/identity/{verification}` | `verifications:read` |
| `GET` | `/private/verifications/identity/{verification}/actions` | `verifications:read` |
| `POST` | `/private/verifications/cards` | `verifications:write` |
| `GET` | `/private/verifications/cards/{verification}` | `verifications:read` |
| `GET` | `/private/verifications/cards/{verification}/actions` | `verifications:read` |

## Webhooks

| Method | Path | Scope |
| --- | --- | --- |
| `GET` | `/private/webhooks` | `webhooks:read` |
| `POST` | `/private/webhooks` | `webhooks:write` |
| `POST` | `/private/webhooks/test` | `webhooks:write` |
| `GET` | `/private/webhooks/events` | `webhooks:deliveries:read` |
| `GET` | `/private/webhooks/events/{event}` | `webhooks:deliveries:read` |
| `GET` | `/private/webhooks/deliveries` | `webhooks:deliveries:read` |
| `GET` | `/private/webhooks/deliveries/{delivery}` | `webhooks:deliveries:read` |
| `POST` | `/private/webhooks/deliveries/{delivery}/retry` | `webhooks:deliveries:retry` |
| `GET` | `/private/webhooks/{webhook}` | `webhooks:read` |
| `PATCH` | `/private/webhooks/{webhook}` | `webhooks:write` |
| `DELETE` | `/private/webhooks/{webhook}` | `webhooks:write` |
| `POST` | `/private/webhooks/{webhook}/rotate-secret` | `webhooks:write` |

## Orders, partner, reviews and sandbox

| Method | Path | Scope |
| --- | --- | --- |
| `GET` | `/private/orders/statuses` | `orders:statuses:read` |
| `GET` | `/private/orders` | `orders:read` |
| `GET` | `/private/orders/{order}` | `orders:detail:read` |
| `GET` | `/private/partner` | `partner:read` |
| `GET` | `/private/partner/statistics` | `partner:statistics:read` |
| `GET` | `/private/partner/referrals` | `partner:referrals:read` |
| `GET` | `/private/partner/exchanges` | `partner:exchanges:read` |
| `GET` | `/private/partner/payouts` | `partner:payouts:read` |
| `GET` | `/private/reviews` | `reviews:read` |
| `POST` | `/private/reviews` | `reviews:write` |
| `POST` | `/private/sandbox/exchange/orders/simulate` | `sandbox:run` |

