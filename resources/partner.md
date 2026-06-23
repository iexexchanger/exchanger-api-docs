# Партнерский API

Партнерский API нужен для личного кабинета партнера, аналитики, отчетов и сверки выплат. Все endpoints работают от имени текущего клиента, которому принадлежит API-ключ.

## Что можно получить

| Данные | Endpoint | Что показывать клиенту |
| --- | --- | --- |
| Сводка партнера | `GET /private/partner` | Партнерский статус, баланс, базовые показатели. |
| Статистика | `GET /private/partner/statistics` | Агрегации по периоду: переходы, регистрации, обмены, начисления. |
| Рефералы | `GET /private/partner/referrals` | Список привлеченных клиентов. |
| Партнерские обмены | `GET /private/partner/exchanges` | Обмены, по которым начисляется партнерское вознаграждение. |
| Выплаты | `GET /private/partner/payouts` | История и состояние выплат партнеру. |

Для партнерского кабинета обычно нужны scopes:

```text
partner:read
partner:statistics:read
partner:referrals:read
partner:exchanges:read
partner:payouts:read
```

## Сводка

```bash
curl -sS https://example.com/api/v3/private/partner \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Статистика

```bash
curl -sS "https://example.com/api/v3/private/partner/statistics?period=month" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

`period` используйте для переключателей в интерфейсе: день, неделя, месяц или свой диапазон, если он поддержан установкой.

## Рефералы

```bash
curl -sS "https://example.com/api/v3/private/partner/referrals?page=1&per_page=50" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Партнерские обмены

```bash
curl -sS "https://example.com/api/v3/private/partner/exchanges?filter[created_from]=2026-06-01" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Выплаты

```bash
curl -sS "https://example.com/api/v3/private/partner/payouts?filter[status]=paid" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Рекомендации

- Показывайте суммы в той валюте, которую вернул API, не пересчитывайте их самостоятельно.
- Для длинных списков используйте `page` и `per_page`.
- Для сверки выплат сохраняйте ID payout и период отчета.
- Не смешивайте партнерские данные с обычным списком заявок: для заявок клиента используйте [Orders API](orders.md), для партнерских начислений используйте `GET /private/partner/exchanges`.

Точные параметры и responses: [Partner API Reference](../api-reference/partner.md).
