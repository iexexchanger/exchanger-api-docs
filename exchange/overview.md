# Exchange overview

Exchange API позволяет собрать полный путь обмена: показать пользователю доступные платежные системы, найти направление, рассчитать сумму, проверить обязательные поля и создать заявку.

## Recommended flow

```text
payment systems
  -> routes
  -> route details or capabilities
  -> quote
  -> preflight
  -> create order
  -> order status or webhook
```

## Основные endpoints

| Step | Endpoint |
| --- | --- |
| Получить платежные системы | `GET /private/exchange/payment-systems` |
| Получить направления | `GET /private/exchange/routes` |
| Получить details направления | `GET /private/exchange/routes/{route}/details` |
| Получить capabilities направления | `GET /private/exchange/routes/{route}/capabilities` |
| Рассчитать quote | `POST /private/exchange/quotes` |
| Проверить заявку до создания | `POST /private/exchange/orders/preflight` |
| Создать заявку | `POST /private/exchange/orders` |
| Получить заявку | `GET /private/exchange/orders/{order}` |
| Получить статус заявки | `GET /private/exchange/orders/{order}/status` |
| Получить действия | `GET /private/exchange/orders/{order}/actions` |
| Подтвердить оплату | `POST /private/exchange/orders/{order}/confirm` |
| Отменить заявку | `POST /private/exchange/orders/{order}/cancel` |

Все endpoints выше приватные и требуют Bearer token.

## Route ID and currency pair

Большинство exchange endpoints принимает `route_id`. Если интеграция работает с pair-first логикой, можно передавать пару валют:

```json
{
  "from_currency_id": 1,
  "to_currency_id": 2,
  "amount": "100"
}
```

или коды:

```json
{
  "from": "USDT",
  "to": "BTC",
  "amount": "100"
}
```

Для production проще и надежнее:

1. Получить routes.
2. Сохранить выбранный `route_id`.
3. Использовать `route_id` в quote, preflight и create order.

## Amount direction

Обычно `amount` означает сумму, которую пользователь отдает. Если интерфейс поддерживает разные режимы расчета, используйте поля, которые возвращает `capabilities`, и явно показывайте пользователю направление суммы.

## Fixed and floating rate

Поле `type_rate` может быть:

| Value | Meaning |
| --- | --- |
| `fixed` или `1` | Фиксированный курс, если направление это поддерживает. |
| `floating` или `0` | Плавающий курс. |

Если направление не поддерживает выбранный режим, API вернет ошибку или preflight покажет, что заявку нельзя создать с такими параметрами.

## Snapshot

`capabilities` и `details` могут возвращать snapshot направления. Snapshot помогает убедиться, что заявка создается по тем условиям, которые видел пользователь: лимиты, поля, правила, курс и требования не должны неожиданно поменяться между экраном выбора и созданием заявки.

Если API вернул snapshot, передавайте его в `quote`, `preflight` и `create order`, если ваша интеграция поддерживает строгую проверку условий.

## Production recommendations

- Не храните список направлений навсегда. Обновляйте его из API.
- Не создавайте заявку без preflight.
- Используйте `Idempotency-Key` для создания заявки.
- Сохраняйте `tracking_id` и `public_id` после создания.
- Подключайте webhooks для статусов.
- Используйте polling статуса только как fallback.

