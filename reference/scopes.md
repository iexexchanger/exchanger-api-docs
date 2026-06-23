# Scopes и права ключа

Scopes ограничивают, что API-ключ может делать. Выдавайте ключу только те права, которые нужны конкретной интеграции.

## Клиент и платформа

| Scope | Что разрешает |
| --- | --- |
| `public-api:client:read` | Читать профиль клиента. |
| `client:balance:read` | Читать баланс клиента, если баланс доступен. |
| `client:health:read` | Проверять состояние API-доступа клиента. |
| `usage:read` | Читать usage, лимиты и квоты. |
| `contracts:read` | Читать контракты API. |
| `schemas:read` | Читать схемы API. |
| `scopes:read` | Читать список доступных scopes. |

## Заявки

| Scope | Что разрешает |
| --- | --- |
| `orders:read` | Читать список заявок. |
| `orders:detail:read` | Читать одну заявку. |
| `orders:statuses:read` | Читать справочник статусов заявок. |

## Обмен

| Scope | Что разрешает |
| --- | --- |
| `exchange:routes:read` | Читать платежные системы, направления и детали направления. |
| `exchange:capabilities:read` | Читать возможности направления. |
| `exchange:quotes:read` | Рассчитывать quote. |
| `exchange:preflight:read` | Проверять заявку через preflight. |
| `exchange:orders:create` | Создавать заявки. |
| `exchange:orders:confirm` | Подтверждать оплату заявки. |
| `exchange:orders:cancel` | Отменять заявки. |
| `exchange:orders:actions:read` | Читать доступные действия по заявке. |

## Файлы и проверки

| Scope | Что разрешает |
| --- | --- |
| `files:read` | Читать состояние upload intent. |
| `files:write` | Создавать upload intent и загружать файл. |
| `verifications:read` | Читать требования и статусы проверок. |
| `verifications:write` | Отправлять identity/card verification. |

## Webhooks

| Scope | Что разрешает |
| --- | --- |
| `webhooks:read` | Читать webhook endpoints. |
| `webhooks:write` | Создавать, изменять, удалять webhook endpoints и менять secret. |
| `webhooks:deliveries:read` | Читать события и доставки webhook. |
| `webhooks:deliveries:retry` | Повторно отправлять webhook delivery. |

## Партнерка

| Scope | Что разрешает |
| --- | --- |
| `partner:read` | Читать партнерскую сводку. |
| `partner:referrals:read` | Читать рефералов. |
| `partner:exchanges:read` | Читать партнерские обмены. |
| `partner:payouts:read` | Читать партнерские выплаты. |
| `partner:statistics:read` | Читать партнерскую статистику. |

## Отзывы

| Scope | Что разрешает |
| --- | --- |
| `reviews:read` | Читать отзывы. |
| `reviews:write` | Создавать отзыв. |

## Sandbox

| Scope | Что разрешает |
| --- | --- |
| `sandbox:run` | Запускать sandbox-симуляцию заявки. |

## Готовые наборы прав

| Интеграция | Scopes |
| --- | --- |
| CRM только для чтения | `orders:read`, `orders:detail:read`, `orders:statuses:read`, `client:health:read` |
| Форма обмена | `exchange:routes:read`, `exchange:capabilities:read`, `exchange:quotes:read`, `exchange:preflight:read`, `exchange:orders:create`, `orders:detail:read` |
| Форма обмена с подтверждением оплаты | Scopes формы обмена плюс `exchange:orders:confirm`, `exchange:orders:actions:read` |
| Управление webhooks | `webhooks:read`, `webhooks:write`, `webhooks:deliveries:read` |
| Партнерский кабинет | `partner:read`, `partner:statistics:read`, `partner:referrals:read`, `partner:exchanges:read`, `partner:payouts:read` |
