# Отзывы

Reviews API позволяет читать отзывы и создавать отзыв по заявке клиента.

## Получить отзывы

```bash
curl -sS "https://example.com/api/v3/private/reviews?page=1&per_page=20" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Создать отзыв

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

Обычно клиент может оставить один отзыв на одну заявку. Новый отзыв может ожидать модерации.

