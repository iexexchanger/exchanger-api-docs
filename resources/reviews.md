# Reviews

Reviews API lets integrations read public reviews and create a review for the authenticated client's order.

## List reviews

```bash
curl -sS "https://example.com/api/v3/private/reviews?page=1&per_page=20" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Create review

```bash
curl -sS https://example.com/api/v3/private/reviews \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: review-TRK8K2LQ-001" \
  -d '{
    "order_id": "TRK8K2LQ",
    "rating": 5,
    "text": "Fast exchange, thank you"
  }'
```

## Notes

- A client can usually leave only one review per order.
- New reviews may require moderation before publication.
- Use `Idempotency-Key` to avoid duplicate review creation after retry.

