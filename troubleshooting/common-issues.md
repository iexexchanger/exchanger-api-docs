# Troubleshooting

## `401 authentication_required`

Check:

- `Authorization: Bearer ...` header exists;
- token was copied completely;
- token was not revoked;
- request is sent to the correct domain and `/api/v3` path.

## `401 invalid_signature`

Check:

- path in signature includes `/api/v3`;
- body hash is calculated from exact body bytes;
- query canonicalization is sorted and RFC3986-encoded;
- timestamp is current;
- nonce was not reused;
- API HMAC secret is used, not webhook secret.

## `403 scope_denied`

The key does not have the required scope. Compare endpoint with [Endpoint matrix](../reference/endpoints.md), then ask the account owner or administrator to update scopes.

## `403 ip_not_allowed`

The request came from an IP that is not in the key allow-list.

Fix:

- add all production egress IPs;
- check NAT/load balancer public IP;
- check whether staging and production use different IPs.

## `409 idempotency_conflict`

The same `Idempotency-Key` was used with a different method, path or body.

Fix:

- reuse the same key only for the same business operation;
- generate a new key for a new order;
- do not mutate body between retries.

## `422 validation_error`

The payload is missing required fields or has invalid values.

Fix:

- call `capabilities` before building the form;
- call `preflight` before `create order`;
- show `missing_fields` to the user;
- validate amount against min/max limits.

## `429 rate_limit_exceeded`

The integration is sending too many requests.

Fix:

- wait for `Retry-After`;
- use exponential backoff;
- cache routes and payment systems briefly;
- use webhooks instead of frequent polling.

## Webhook signature fails

Check:

- receiver uses raw body, not re-encoded JSON;
- correct webhook secret is used;
- signature header includes `sha256=`;
- timestamp and nonce headers are passed correctly;
- body parser does not consume raw bytes before verification.

## Order created twice

Most likely the integration retried without `Idempotency-Key` or used a different key for the retry.

Fix:

- always send `Idempotency-Key` for `POST /private/exchange/orders`;
- store key with local checkout/session;
- retry timeout with the same key.

