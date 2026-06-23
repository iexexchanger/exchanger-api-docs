# Пагинация, фильтры и сортировка

Списковые endpoints поддерживают общие query parameters.

## Пагинация

```text
?page=1&per_page=50
```

Пример:

```bash
curl -sS "https://example.com/api/v3/private/orders?page=1&per_page=50" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Фильтры

Фильтры передаются в формате:

```text
filter[name]=value
```

Пример:

```bash
curl -sS "https://example.com/api/v3/private/orders?filter[status]=processing&filter[created_from]=2026-06-01&filter[created_to]=2026-06-23" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Суффиксы

| Суффикс | Значение |
| --- | --- |
| `_from` | От даты или значения. |
| `_to` | До даты или значения. |
| `_min` | Минимальное число. |
| `_max` | Максимальное число. |

## Сортировка

```text
?sort=created_at
?sort=-created_at
```

Минус означает обратный порядок.

## Где смотреть доступные фильтры

Полный список фильтров по ресурсам: [Фильтры списков](../reference/filters.md).

