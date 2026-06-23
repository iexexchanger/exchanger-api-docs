# Общий сценарий обмена

Раздел обмена нужен, чтобы внешнее приложение могло создать заявку так же, как пользователь создает ее на сайте обменника: выбрать направление, увидеть расчет, заполнить реквизиты и получить номер заявки.

## Правильная последовательность

```text
1. Получить платежные системы
2. Получить направления обмена
3. Получить возможности выбранного направления
4. Рассчитать quote
5. Проверить данные через preflight
6. Создать заявку
7. Отслеживать статус
```

Не создавайте заявку сразу после выбора валют. Сначала нужно получить ограничения направления и выполнить preflight.

## Какие endpoints участвуют

| Шаг | Endpoint |
| --- | --- |
| Получить платежные системы | `GET /private/exchange/payment-systems` |
| Получить направления | `GET /private/exchange/routes` |
| Получить детали направления | `GET /private/exchange/routes/{route}/details` |
| Получить возможности направления | `GET /private/exchange/routes/{route}/capabilities` |
| Рассчитать обмен | `POST /private/exchange/quotes` |
| Проверить заявку | `POST /private/exchange/orders/preflight` |
| Создать заявку | `POST /private/exchange/orders` |
| Получить заявку | `GET /private/exchange/orders/{order}` |
| Получить статус | `GET /private/exchange/orders/{order}/status` |
| Получить доступные действия | `GET /private/exchange/orders/{order}/actions` |
| Подтвердить оплату | `POST /private/exchange/orders/{order}/confirm` |
| Отменить заявку | `POST /private/exchange/orders/{order}/cancel` |

## Что сохранять у себя

После создания заявки сохраните:

| Поле | Зачем нужно |
| --- | --- |
| `id` | Внутренний ID заявки в API. |
| `public_id` | Публичный номер заявки для интерфейса. |
| `tracking_id` | Удобный идентификатор для статуса, webhook и support. |
| `status` | Текущий статус заявки. |
| `amount` | Сумма, которую пользователь отдает. |
| `receive_amount` | Сумма, которую пользователь получает. |

## Рекомендации для production

- Получайте направления из API, а не храните фиксированный список.
- Перед показом формы используйте `capabilities`.
- Перед созданием заявки используйте `preflight`.
- Для `POST /private/exchange/orders` всегда передавайте `Idempotency-Key`.
- Подключите webhooks для статусов.
- Используйте polling статуса только как запасной вариант.

## OpenAPI Reference

Точные schemas, request body и responses для exchange endpoints находятся на странице [Exchange API Reference](../api-reference/exchange.md). Эта страница рендерится из `openapi/openapi.yaml` через GitBook OpenAPI blocks.
