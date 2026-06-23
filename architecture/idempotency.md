# Idempotency

Idempotency защищает write-запросы от дублей при повторе из-за timeout, сетевой ошибки или retry.

Передавайте header:

```http
Idempotency-Key: order-25-100-20260623-001
```

## Когда использовать

Используйте `Idempotency-Key` для:

- `POST /private/exchange/orders`;
- `POST /private/exchange/orders/{order}/confirm`;
- `POST /private/exchange/orders/{order}/cancel`;
- upload commit;
- создание webhook endpoint;
- другие `POST`, `PUT`, `PATCH`, `DELETE`, где повтор может изменить состояние.

## Key format

Рекомендуемый формат:

```text
{operation}-{business-id}-{timestamp-or-sequence}
```

Примеры:

```text
create-order-cart-92831-001
confirm-order-TRK123456-001
webhook-create-production-001
```

Ключ должен быть уникальным для одной бизнес-операции. Если вы повторяете тот же запрос после timeout, используйте тот же ключ.

## Replay behavior

Если первый запрос завершился успешно, повтор с тем же ключом вернет сохраненный ответ и header:

```http
Idempotency-Replayed: true
```

Если тот же ключ использован с другим body или другим path, API вернет конфликт.

## Client behavior

| Ситуация | Что делать |
| --- | --- |
| Network timeout | Повторить тот же request с тем же `Idempotency-Key`. |
| `5xx` | Повторить с backoff и тем же ключом. |
| `409 idempotency_conflict` | Не повторять. Создать новый ключ только если это новая операция. |
| `429` | Ждать `Retry-After`, затем повторить с тем же ключом. |

