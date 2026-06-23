# Webhooks

Интерактивные blocks для управления webhooks и доставками.

## List webhooks

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/webhooks" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Create webhook

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/webhooks" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Test webhook

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/webhooks/test" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## List webhook events

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/webhooks/events" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## List deliveries

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/webhooks/deliveries" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Retry delivery

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/webhooks/deliveries/{delivery}/retry" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Update webhook

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/webhooks/{webhook}" method="patch" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Rotate webhook secret

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/webhooks/{webhook}/rotate-secret" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

