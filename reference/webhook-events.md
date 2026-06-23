# Webhook events

Subscribe only to events your integration actually processes.

| Event | Meaning |
| --- | --- |
| `api.test` | Test event for endpoint verification. |
| `order.created` | Order created. |
| `order.preflight` | Order preflight completed. |
| `order.status_changed` | Order status changed. |
| `order.payment_received` | Payment was marked received. |
| `verification.identity.created` | Identity verification submitted. |
| `verification.identity.status_changed` | Identity verification status changed. |
| `verification.card.created` | Card verification submitted. |
| `verification.card.status_changed` | Card verification status changed. |
| `file.uploaded` | File upload completed. |
| `api.sandbox.simulated` | Sandbox simulation completed. |
| `review.created` | Review created. |
| `partner.payout.paid` | Partner payout paid. |

## Wildcard

Some installations may allow subscribing to all events with:

```text
*
```

Use wildcard only for logging, audit or development. In production, explicit event lists are easier to reason about.

## Event payload

Typical event delivery body:

```json
{
  "id": "evt_...",
  "type": "order.status_changed",
  "created_at": "2026-06-23T10:00:00+00:00",
  "data": {
    "order": {
      "tracking_id": "TRK8K2LQ",
      "status": "processing"
    }
  }
}
```

Always use the event `type` and object IDs inside `data`. Do not assume every event has the same payload fields.

