# События webhooks

Подписывайтесь только на те события, которые ваша интеграция действительно обрабатывает.

| Событие | Что означает |
| --- | --- |
| `api.test` | Тестовое событие для проверки endpoint. |
| `order.created` | Создана заявка. |
| `order.preflight` | Выполнен preflight заявки. |
| `order.status_changed` | Изменился статус заявки. |
| `order.payment_received` | Оплата отмечена как полученная. |
| `verification.identity.created` | Отправлена identity verification. |
| `verification.identity.status_changed` | Изменился статус identity verification. |
| `verification.card.created` | Отправлена card verification. |
| `verification.card.status_changed` | Изменился статус card verification. |
| `file.uploaded` | Файл загружен. |
| `api.sandbox.simulated` | Выполнена sandbox-симуляция. |
| `review.created` | Создан отзыв. |
| `partner.payout.paid` | Партнерская выплата отмечена оплаченной. |

## Подписка на все события

В некоторых установках может быть доступна подписка:

```text
*
```

Используйте ее только для разработки, аудита или логирования. В production лучше явно выбрать нужные события.

## Пример payload

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

Обрабатывайте событие по `type` и идентификаторам внутри `data`. Не предполагайте, что все события имеют одинаковые поля.

