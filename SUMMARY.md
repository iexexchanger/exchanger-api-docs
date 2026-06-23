# Содержание

## Начало работы

* [Что такое iEXExchanger API](README.md)
* [Все возможности API](start/api-capabilities.md)
* [Быстрый старт: первая заявка](start/quick-start.md)
* [Кто что делает: администратор, клиент, разработчик](start/roles-and-responsibilities.md)
* [Чеклист перед запуском](start/integration-checklist.md)

## Получение доступа и ключей

* [Как администратору включить API](setup/admin-enable-api.md)
* [Как клиенту получить API-ключ](setup/client-get-api-key.md)
* [API-ключи, HMAC-секрет и ротация](setup/api-keys.md)
* [Безопасные production-настройки](setup/production-settings.md)

## Как устроен API

* [Базовый URL и версия](architecture/base-url-versioning.md)
* [Формат запросов, ответов и headers](architecture/envelopes-and-headers.md)
* [Авторизация Bearer token](architecture/authentication.md)
* [HMAC-подпись запросов](architecture/hmac-signature.md)
* [Защита от дублей через Idempotency-Key](architecture/idempotency.md)
* [Лимиты, квоты и Retry-After](architecture/rate-limits-quotas.md)
* [Пагинация, фильтры и сортировка](architecture/pagination-filters-sort.md)
* [Ошибки и как их обрабатывать](architecture/errors.md)

## Обмен и заявки

* [Общий сценарий обмена](exchange/overview.md)
* [Платежные системы и направления](exchange/payment-systems-and-routes.md)
* [Возможности направления](exchange/route-capabilities.md)
* [Расчет, preflight и создание заявки](exchange/quotes-preflight-orders.md)
* [Статусы и действия по заявке](exchange/order-actions-statuses.md)
* [Файлы и верификации](exchange/files-and-verifications.md)
* [Sandbox-проверка](exchange/sandbox.md)

## Webhooks

* [Как подключить webhooks](webhooks/overview.md)
* [Как проверить подпись webhook](webhooks/delivery-signatures.md)
* [История доставок и повторная отправка](webhooks/delivery-center.md)

## API Reference

* [Как читать API Reference](reference/openapi-reference.md)
* [System](api-reference/system.md)
* [Security](api-reference/security.md)
* [Client и Usage](api-reference/client-usage.md)
* [Platform contracts и schemas](api-reference/platform.md)
* [Exchange](api-reference/exchange.md)
* [Orders](api-reference/orders.md)
* [Files](api-reference/files.md)
* [Verifications](api-reference/verifications.md)
* [Webhooks](api-reference/webhooks.md)
* [Partner](api-reference/partner.md)
* [Reviews](api-reference/reviews.md)
* [Sandbox](api-reference/sandbox.md)

## Дополнительные возможности

* [Клиент, health и usage](resources/client-health-usage.md)
* [Список заявок](resources/orders.md)
* [Партнерский API](resources/partner.md)
* [Отзывы](resources/reviews.md)
* [Публичный XML-файл курсов](resources/public-rates-xml.md)

## Готовые примеры

* [cURL: полный путь до заявки](examples/curl-create-order.md)
* [PHP: подпись HMAC и запрос](examples/php-signed-request.md)
* [TypeScript: SDK-клиент](examples/typescript-client.md)
* [Обработчик webhook](examples/webhook-receiver.md)

## Справочник

* [Все endpoints](reference/endpoints.md)
* [Scopes и права ключа](reference/scopes.md)
* [Фильтры списков](reference/filters.md)
* [События webhooks](reference/webhook-events.md)
* [Решение частых проблем](troubleshooting/common-issues.md)
