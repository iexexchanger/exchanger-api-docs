# Webhook receiver: пример обработчика

Webhook receiver принимает события от iEXExchanger API. Его задача: проверить подпись, сохранить событие и выполнить нужное действие.

## Что приходит в запросе

Headers, которые придут от API:

```http
X-Webhook-Event-Id: evt_01J...
X-Webhook-Event-Type: order.status_changed
X-Webhook-Timestamp: 1782190000
X-Webhook-Nonce: wh_20260623_001
X-Webhook-Signature: sha256=...
```

Body:

```json
{
  "id": "evt_01J...",
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

## Пример обработчика на TypeScript

```ts
import express from "express";
import crypto from "node:crypto";

const app = express();

app.post(
  "/webhooks/iex",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const secret = process.env.IEX_WEBHOOK_SECRET!;

    const eventId = String(req.header("X-Webhook-Event-Id") ?? "");
    const eventType = String(req.header("X-Webhook-Event-Type") ?? "");
    const timestamp = String(req.header("X-Webhook-Timestamp") ?? "");
    const nonce = String(req.header("X-Webhook-Nonce") ?? "");
    const signature = String(req.header("X-Webhook-Signature") ?? "");

    const bodyHash = crypto
      .createHash("sha256")
      .update(req.body)
      .digest("hex");

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

    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
      return res.status(401).json({ ok: false });
    }

    const payload = JSON.parse(req.body.toString("utf8"));

    // Сохраните eventId в базе, чтобы не обработать одно событие дважды.
    // После сохранения можно запускать бизнес-логику.

    return res.json({ received: true });
  },
);
```

## Правила обработки

- Проверяйте подпись до бизнес-логики.
- Используйте raw body, а не повторно собранный JSON.
- Храните `event_id`, чтобы избежать дублей.
- Возвращайте `2xx` только после успешного сохранения события.
- Если событие уже было обработано, верните `2xx` без повторной операции.
