# Scopes

Scopes limit what an API key can do. Give each key the smallest set needed for its integration.

## Client and platform

| Scope | Allows |
| --- | --- |
| `public-api:client:read` | Read client profile. |
| `client:balance:read` | Read balance data when available. |
| `client:health:read` | Check client API health. |
| `usage:read` | Read usage and quota. |
| `contracts:read` | Read API contracts. |
| `schemas:read` | Read schema registry. |
| `scopes:read` | Read available scopes. |

## Orders

| Scope | Allows |
| --- | --- |
| `orders:read` | List orders. |
| `orders:detail:read` | Read one order. |
| `orders:statuses:read` | Read order status catalog. |

## Exchange

| Scope | Allows |
| --- | --- |
| `exchange:routes:read` | Read payment systems, routes and route details. |
| `exchange:capabilities:read` | Read route capabilities. |
| `exchange:quotes:read` | Create exchange quotes. |
| `exchange:preflight:read` | Run order preflight. |
| `exchange:orders:create` | Create orders. |
| `exchange:orders:confirm` | Confirm order payment. |
| `exchange:orders:cancel` | Cancel orders. |
| `exchange:orders:actions:read` | Read available order actions. |

## Files and verifications

| Scope | Allows |
| --- | --- |
| `files:read` | Read upload intent state. |
| `files:write` | Create and commit upload intents. |
| `verifications:read` | Read verification requirements and statuses. |
| `verifications:write` | Submit identity/card verifications. |

## Webhooks

| Scope | Allows |
| --- | --- |
| `webhooks:read` | List and read webhook endpoints. |
| `webhooks:write` | Create, update, delete and rotate webhook endpoints. |
| `webhooks:deliveries:read` | Read webhook events and deliveries. |
| `webhooks:deliveries:retry` | Retry webhook delivery. |

## Partner and reviews

| Scope | Allows |
| --- | --- |
| `partner:read` | Read partner summary. |
| `partner:referrals:read` | Read referrals. |
| `partner:exchanges:read` | Read partner exchanges. |
| `partner:payouts:read` | Read payouts. |
| `partner:statistics:read` | Read partner statistics. |
| `reviews:read` | Read reviews. |
| `reviews:write` | Create review. |

## Sandbox

| Scope | Allows |
| --- | --- |
| `sandbox:run` | Run sandbox simulations. |

## Suggested scope sets

| Integration | Scopes |
| --- | --- |
| Read-only CRM | `orders:read`, `orders:detail:read`, `orders:statuses:read`, `client:health:read` |
| Exchange checkout | `exchange:routes:read`, `exchange:capabilities:read`, `exchange:quotes:read`, `exchange:preflight:read`, `exchange:orders:create`, `orders:detail:read` |
| Checkout with payment confirmation | Exchange checkout scopes plus `exchange:orders:confirm`, `exchange:orders:actions:read` |
| Webhook management | `webhooks:read`, `webhooks:write`, `webhooks:deliveries:read` |
| Partner dashboard | `partner:read`, `partner:statistics:read`, `partner:referrals:read`, `partner:exchanges:read`, `partner:payouts:read` |

