# Pagination, filters and sorting

Списковые endpoints поддерживают единый стиль query parameters.

## Pagination

```text
?page=1&per_page=50
```

| Parameter | Description |
| --- | --- |
| `page` | Номер страницы. |
| `per_page` | Размер страницы. Обычно максимум `100`. |
| `cursor` | Cursor для endpoints, где включена cursor pagination. |

Пример:

```bash
curl -sS "https://example.com/api/v3/private/orders?page=1&per_page=50" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Filters

Filters передаются как `filter[name]=value`.

```text
?filter[status]=created&filter[created_from]=2026-06-01&filter[created_to]=2026-06-23
```

Суффиксы:

| Suffix | Meaning |
| --- | --- |
| `_from` | Больше или равно. |
| `_to` | Меньше или равно. |
| `_min` | Больше или равно для чисел. |
| `_max` | Меньше или равно для чисел. |

Список значений можно передавать повторяющимися параметрами или форматом, который поддерживает ваш HTTP-клиент.

## Sorting

```text
?sort=created_at
?sort=-created_at
```

| Format | Meaning |
| --- | --- |
| `created_at` | По возрастанию. |
| `-created_at` | По убыванию. |

## Example

```bash
curl -sS "https://example.com/api/v3/private/orders?filter[status]=processing&filter[created_from]=2026-06-01&sort=-created_at&page=1&per_page=50" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Полный список фильтров: [Filters](../reference/filters.md).

