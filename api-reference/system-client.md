# System и Client

Endpoints для проверки доступности API, состояния ключа, профиля клиента и usage.

## Публичный ping

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/ping" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Приватный ping

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/ping" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Проверка клиента и ключа

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/health/client" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Профиль клиента

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/client" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Usage

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/usage" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}
