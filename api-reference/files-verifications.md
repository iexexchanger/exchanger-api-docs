# Files и Verifications

Endpoints для загрузки файлов, проверки личности и проверки карты.

## Создать upload intent

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/files/upload-intents" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Получить upload intent

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/files/upload-intents/{intent}" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Загрузить файл по upload intent

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/files/upload-intents/{intent}/commit" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Требования к проверке

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/verifications/requirements" method="get" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Отправить identity verification

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/verifications/identity" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}

## Отправить card verification

{% openapi src="https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml" path="/private/verifications/cards" method="post" %}
[openapi.yaml](https://raw.githubusercontent.com/iexexchanger/exchanger-api-docs/main/openapi/openapi.yaml)
{% endopenapi %}
