# Защита от дублей через Idempotency-Key

`Idempotency-Key` нужен, чтобы повтор одного и того же write-запроса не создал дубль.

Главный пример: создание заявки. Если клиент отправил запрос, но соединение оборвалось, он может повторить запрос с тем же ключом. API вернет тот же результат, а не создаст вторую заявку.

## Header запроса

```http
Idempotency-Key: create-order-user-42-001
```

## Где использовать

Используйте `Idempotency-Key` для:

- `POST /private/exchange/orders`;
- `POST /private/exchange/orders/{order}/confirm`;
- `POST /private/exchange/orders/{order}/cancel`;
- `POST /private/files/upload-intents/{intent}/commit`;
- `POST /private/webhooks`;
- любых write-запросов, где повтор опасен.

## Как выбирать ключ

Хороший ключ:

```text
create-order-user-42-001
confirm-order-TRK8K2LQ-001
webhook-production-create-001
```

Плохой ключ:

```text
123
test
random
```

Ключ должен быть уникален для одной бизнес-операции. Для повтора той же операции используйте тот же ключ.

## Что будет при повторе

Если тот же запрос повторился с тем же ключом, API вернет сохраненный ответ и может добавить header:

```http
Idempotency-Replayed: true
```

Если тот же ключ отправлен с другим body или другим endpoint, API вернет конфликт.
