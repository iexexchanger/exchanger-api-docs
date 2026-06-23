# PHP: подпись HMAC и запрос

Этот пример показывает, как подписать JSON-запрос к API в PHP. Он использует helper:

```text
sdk/php/PublicApiSigner.php
```

## Установка в проект

Скопируйте файл `sdk/php/PublicApiSigner.php` в свой проект или подключите его как часть вашего SDK-слоя.

Пример переменных окружения:

```env
IEX_API_BASE_URL=https://example.com/api/v3
IEX_API_KEY=your_bearer_token
IEX_HMAC_SECRET=your_hmac_secret
```

## Подписанный запрос расчета

```php
<?php

require __DIR__.'/sdk/php/PublicApiSigner.php';

use GuzzleHttp\Client;
use iEXPackages\ExchangerApi\OpenApi\Sdk\Php\PublicApiSigner;

$baseUrl = getenv('IEX_API_BASE_URL');
$apiKey = getenv('IEX_API_KEY');
$hmacSecret = getenv('IEX_HMAC_SECRET');

$path = '/api/v3/private/exchange/quotes';

$body = PublicApiSigner::jsonBody([
    'route_id' => 25,
    'amount' => '100',
    'type_rate' => 'fixed',
]);

$signedHeaders = PublicApiSigner::headers(
    method: 'POST',
    path: $path,
    hmacSecret: $hmacSecret,
    body: $body,
);

$client = new Client();

$response = $client->post($baseUrl.'/private/exchange/quotes', [
    'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer '.$apiKey,
        ...$signedHeaders,
    ],
    'body' => $body,
]);

echo $response->getBody()->getContents();
```

## Важное правило

Подписывайте ровно тот JSON, который отправляете:

```php
$body = PublicApiSigner::jsonBody([...]);
```

Не делайте так:

```php
$signedBody = json_encode($payload);
$sentBody = json_encode($payload, JSON_PRETTY_PRINT);
```

В этом случае подпись будет рассчитана от одного body, а отправлен будет другой body.

## Создание заявки с Idempotency-Key

```php
$path = '/api/v3/private/exchange/orders';

$body = PublicApiSigner::jsonBody([
    'route_id' => 25,
    'amount' => '100',
    'income_account' => 'FROM-REQUISITE',
    'outcome_account' => 'TO-REQUISITE',
    'type_rate' => 'fixed',
]);

$signedHeaders = PublicApiSigner::headers(
    method: 'POST',
    path: $path,
    hmacSecret: $hmacSecret,
    body: $body,
);

$response = $client->post($baseUrl.'/private/exchange/orders', [
    'headers' => [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer '.$apiKey,
        'Idempotency-Key' => 'create-order-user-42-001',
        ...$signedHeaders,
    ],
    'body' => $body,
]);
```
