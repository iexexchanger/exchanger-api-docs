# Отзывы

Reviews API позволяет читать опубликованные отзывы и создавать отзыв по своей заявке. Это отдельный раздел API: он не относится к партнерке и не заменяет статусы заявок.

## Когда использовать

| Задача | Endpoint |
| --- | --- |
| Показать отзывы в приложении или на сайте | `GET /private/reviews` |
| Отфильтровать отзывы по оценке или дате | `GET /private/reviews?filter[rating]=5` |
| Оставить отзыв после завершенной заявки | `POST /private/reviews` |

## Получить отзывы

```bash
curl -sS "https://example.com/api/v3/private/reviews?page=1&per_page=20" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Полезные фильтры:

| Фильтр | Пример |
| --- | --- |
| `filter[rating]` | `filter[rating]=5` |
| `filter[order_id]` | `filter[order_id]=913` |
| `filter[created_from]` | `filter[created_from]=2026-06-01T00:00:00Z` |
| `filter[created_to]` | `filter[created_to]=2026-06-23T23:59:59Z` |

## Создать отзыв

```bash
curl -sS https://example.com/api/v3/private/reviews \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: review-TRK8K2LQ-001" \
  -d '{
    "name": "Alex",
    "order_id": "TRK8K2LQ",
    "rating": 5,
    "rate_speed": 5,
    "text": "Fast exchange, thank you"
  }'
```

Обычно клиент может оставить один отзыв на одну заявку. Новый отзыв может ожидать модерации.

## Рекомендации

- Создавайте отзыв только после завершения заявки.
- Используйте `Idempotency-Key`, чтобы повторный клик пользователя не создал дубль.
- Не отправляйте отзыв без согласия пользователя.
- Для точного контракта смотрите [Reviews API Reference](../api-reference/reviews.md).
