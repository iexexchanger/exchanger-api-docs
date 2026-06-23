# Exchange

Интерактивные OpenAPI blocks для основного сценария обмена.

Перед использованием endpoints прочитайте guide: [Общий сценарий обмена](../exchange/overview.md).

## Payment systems

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/payment-systems" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Routes

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/routes" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Route details

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/routes/{route}/details" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Route capabilities

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/routes/{route}/capabilities" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Quote

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/quotes" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Preflight

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/orders/preflight" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Create order

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/orders" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Get exchange order

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/orders/{order}" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Order status

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/orders/{order}/status" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Order actions

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/orders/{order}/actions" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Confirm payment

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/orders/{order}/confirm" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Cancel order

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/exchange/orders/{order}/cancel" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

