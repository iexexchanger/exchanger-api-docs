# Публичный XML-файл курсов

`GET /public/rates.xml` возвращает курсы в XML-формате.

```bash
curl -sS https://example.com/api/v3/public/rates.xml
```

Этот endpoint публичный и не возвращает JSON envelope.

## Когда использовать

Используйте XML-файл для:

- мониторингов;
- внешних каталогов;
- legacy-интеграций;
- простого публичного экспорта курсов.

Для формы обмена лучше использовать приватные exchange endpoints:

- `GET /private/exchange/payment-systems`;
- `GET /private/exchange/routes`;
- `GET /private/exchange/routes/{route}/details`;
- `POST /private/exchange/quotes`.

