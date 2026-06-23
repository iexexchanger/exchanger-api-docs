# TypeScript: SDK-клиент

В репозитории есть TypeScript-клиент:

```text
sdk/typescript/PublicApiClient.ts
```

Его можно использовать как основу для Node.js backend, Next.js API route, worker или другого серверного приложения.

## Переменные окружения

```env
IEX_API_BASE_URL=https://example.com/api/v3
IEX_API_KEY=your_bearer_token
IEX_HMAC_SECRET=your_hmac_secret
```

Не используйте эти переменные в frontend bundle. API-ключ должен оставаться на сервере.

## Создать клиент

```ts
import { PublicApiClient } from "./sdk/typescript/PublicApiClient";

const client = new PublicApiClient({
  baseUrl: process.env.IEX_API_BASE_URL!,
  bearerToken: process.env.IEX_API_KEY!,
  hmacSecret: process.env.IEX_HMAC_SECRET!,
});
```

## Проверить ключ

```ts
const health = await client.clientHealth();

if (health.state !== 0) {
  throw new Error("API key is not active");
}
```

## Получить направления

```ts
const routes = await client.exchangeRoutes({
  filter: {
    from_currency_id: 1,
    to_currency_id: 2,
  },
});
```

## Рассчитать обмен

```ts
const quote = await client.quoteExchange({
  route_id: 25,
  amount: "100",
  type_rate: "fixed",
});
```

## Создать заявку

```ts
const order = await client.createExchangeOrder(
  {
    route_id: 25,
    amount: "100",
    income_account: "FROM-REQUISITE",
    outcome_account: "TO-REQUISITE",
    type_rate: "fixed",
  },
  {
    idempotencyKey: "create-order-user-42-001",
  },
);

console.log(order.result.order.tracking_id);
```

## Проверить статус

```ts
const status = await client.exchangeOrderStatus("TRK8K2LQ");
```
