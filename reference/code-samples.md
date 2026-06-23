# Code samples

This repository includes helper files for integrations:

| File | Purpose |
| --- | --- |
| `sdk/php/PublicApiSigner.php` | Build signed request headers in PHP. |
| `sdk/typescript/PublicApiClient.ts` | TypeScript client with request helpers. |

## PHP signed JSON request

```php
$body = PublicApiSigner::jsonBody([
    'route_id' => 25,
    'amount' => '100',
]);

$headers = PublicApiSigner::headers(
    method: 'POST',
    path: '/api/v3/private/exchange/quotes',
    hmacSecret: $hmacSecret,
    body: $body,
);

$response = $http->post('https://example.com/api/v3/private/exchange/quotes', [
    'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer '.$apiKey,
        ...$headers,
    ],
    'body' => $body,
]);
```

The important rule: sign the exact JSON string you send.

## TypeScript client

```ts
import { PublicApiClient } from "./sdk/typescript/PublicApiClient";

const client = new PublicApiClient({
  baseUrl: "https://example.com/api/v3",
  bearerToken: process.env.IEX_API_KEY!,
  hmacSecret: process.env.IEX_HMAC_SECRET!,
});

const quote = await client.quoteExchange({
  route_id: 25,
  amount: "100",
  type_rate: "fixed",
});

const order = await client.createExchangeOrder(
  {
    route_id: 25,
    amount: "100",
    income_account: "FROM-REQUISITE",
    outcome_account: "TO-REQUISITE",
  },
  {
    idempotencyKey: "create-order-user-42-001",
  },
);
```

## Environment variables

```bash
IEX_API_BASE_URL=https://example.com/api/v3
IEX_API_KEY=...
IEX_HMAC_SECRET=...
```

Never commit these values to Git.
