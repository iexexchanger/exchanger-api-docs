# Партнерский API

Партнерские endpoints работают только на чтение и возвращают партнерские данные текущего клиента.

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

## Совместимые alias endpoints

Для совместимости могут работать пути:

```text
GET /private/account/partner
GET /private/account/partner/statistics
GET /private/account/partner/referrals
GET /private/account/partner/exchanges
GET /private/account/partner/payouts
```

В новых интеграциях используйте `/private/partner/*`.
