# Delivery signatures

Every webhook delivery is signed. The receiver must verify the signature before processing the event.

## Delivery headers

```http
Content-Type: application/json
X-Webhook-Event-Id: evt_...
X-Webhook-Event-Type: order.status_changed
X-Webhook-Timestamp: 1782190000
X-Webhook-Nonce: wh_20260623_001
X-Webhook-Signature: sha256=...
X-Request-Id: req_...
X-Correlation-Id: cor_...
```

## Canonical string

```text
v1
event_id
event_type
timestamp
nonce
sha256(json_body)
```

Use the raw JSON body exactly as received.

## PHP verification example

```php
function verifyWebhook(
    string $secret,
    string $eventId,
    string $eventType,
    string $timestamp,
    string $nonce,
    string $rawBody,
    string $signatureHeader
): bool {
    $bodyHash = hash('sha256', $rawBody);

    $canonical = implode("\n", [
        'v1',
        $eventId,
        $eventType,
        $timestamp,
        $nonce,
        $bodyHash,
    ]);

    $expected = 'sha256='.hash_hmac('sha256', $canonical, $secret);

    return hash_equals($expected, $signatureHeader)
        || hash_equals(substr($expected, 7), $signatureHeader);
}
```

## TypeScript verification example

```ts
import crypto from "node:crypto";

export function verifyWebhook({
  secret,
  eventId,
  eventType,
  timestamp,
  nonce,
  rawBody,
  signature,
}: {
  secret: string;
  eventId: string;
  eventType: string;
  timestamp: string;
  nonce: string;
  rawBody: Buffer | string;
  signature: string;
}) {
  const body = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody);
  const bodyHash = crypto.createHash("sha256").update(body).digest("hex");

  const canonical = [
    "v1",
    eventId,
    eventType,
    timestamp,
    nonce,
    bodyHash,
  ].join("\n");

  const expected =
    "sha256=" + crypto.createHmac("sha256", secret).update(canonical).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
```

## Replay protection

Store processed event IDs:

```text
X-Webhook-Event-Id
```

If the same event arrives again, return `2xx` and do not repeat business side effects.

## Common mistakes

| Mistake | Fix |
| --- | --- |
| Verifying parsed JSON instead of raw body | Use raw request bytes. |
| Using API HMAC secret | Use webhook endpoint secret. |
| Returning `2xx` before persistence | Save event first, then return success. |
| Treating duplicate event as error | Duplicates are normal during retry. |

