<?php

declare(strict_types=1);

namespace iEXPackages\ExchangerApi\OpenApi\Sdk\Php;

use InvalidArgumentException;

/**
 * Лёгкий PHP signer для публичного Exchanger API.
 *
 * Файл можно подключать отдельно через require_once в любом PHP/Laravel
 * проекте клиента. Логика canonical string полностью повторяет серверный
 * ApiSignatureMiddleware, поэтому один класс подходит для GET/POST/PATCH/DELETE.
 */
final class PublicApiSigner
{
    public const HEADER_TIMESTAMP = 'X-Api-Timestamp';
    public const HEADER_NONCE = 'X-Api-Nonce';
    public const HEADER_SIGNATURE = 'X-Api-Signature';

    /**
     * Вернуть только HMAC-заголовки для запроса.
     *
     * @param array<string, mixed> $query Query-параметры без знака `?`.
     */
    public static function headers(
        string $method,
        string $path,
        string $hmacSecret,
        array $query = [],
        string $body = '',
        ?string $timestamp = null,
        ?string $nonce = null,
    ): array {
        $timestamp = self::timestamp($timestamp);
        $nonce = self::nonce($nonce);
        $signature = hash_hmac(
            'sha256',
            self::canonicalPayload($method, $path, $query, $body, $timestamp, $nonce),
            $hmacSecret,
        );

        return [
            self::HEADER_TIMESTAMP => $timestamp,
            self::HEADER_NONCE => $nonce,
            self::HEADER_SIGNATURE => 'sha256='.$signature,
        ];
    }

    /**
     * Вернуть полный набор заголовков для клиента, который не использует withToken().
     *
     * @param array<string, mixed> $query Query-параметры без знака `?`.
     */
    public static function bearerHeaders(
        string $apiToken,
        string $method,
        string $path,
        string $hmacSecret,
        array $query = [],
        string $body = '',
        ?string $timestamp = null,
        ?string $nonce = null,
    ): array {
        return [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer '.$apiToken,
            ...self::headers($method, $path, $hmacSecret, $query, $body, $timestamp, $nonce),
        ];
    }

    /**
     * Собрать canonical string, который подписывается HMAC-SHA256.
     *
     * @param array<string, mixed> $query Query-параметры без знака `?`.
     */
    public static function canonicalPayload(
        string $method,
        string $path,
        array $query,
        string $body,
        string $timestamp,
        string $nonce,
    ): string {
        [$pathOnly, $queryFromPath] = self::splitPathAndQuery($path);
        $query = $queryFromPath === []
            ? $query
            : array_replace_recursive($queryFromPath, $query);

        return implode("\n", [
            'v1',
            strtoupper($method),
            $pathOnly,
            self::canonicalQuery($query),
            hash('sha256', $body),
            $timestamp,
            $nonce,
        ]);
    }

    /**
     * Канонизировать query-параметры независимо от порядка ключей.
     *
     * @param array<string, mixed> $query
     */
    public static function canonicalQuery(array $query): string
    {
        $pairs = [];
        self::flattenQuery($pairs, $query);
        sort($pairs, SORT_STRING);

        return implode('&', $pairs);
    }

    /**
     * Закодировать JSON-body так, чтобы ровно эту строку можно было подписать.
     *
     * @param array<string, mixed> $payload
     */
    public static function jsonBody(array $payload): string
    {
        $json = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        if ($json === false) {
            throw new InvalidArgumentException('Не удалось закодировать JSON: '.json_last_error_msg());
        }

        return $json;
    }

    /**
     * Достать path и query из path или полного URL.
     *
     * @return array{0:string,1:array<string,mixed>}
     */
    private static function splitPathAndQuery(string $path): array
    {
        $parts = parse_url($path);
        $pathOnly = (string) ($parts['path'] ?? $path);
        $query = [];

        if ($pathOnly === '') {
            $pathOnly = '/';
        }

        if (isset($parts['query'])) {
            parse_str((string) $parts['query'], $query);
        }

        return [$pathOnly, $query];
    }

    /**
     * Схлопнуть вложенные query-параметры в RFC3986 пары.
     *
     * @param list<string> $pairs
     * @param array<string|int, mixed> $values
     */
    private static function flattenQuery(array &$pairs, array $values, string $prefix = ''): void
    {
        foreach ($values as $key => $value) {
            $name = $prefix === '' ? (string) $key : $prefix.'['.(string) $key.']';

            if (is_array($value)) {
                self::flattenQuery($pairs, $value, $name);
                continue;
            }

            $pairs[] = rawurlencode($name).'='.rawurlencode((string) $value);
        }
    }

    /**
     * Вернуть timestamp запроса.
     */
    private static function timestamp(?string $timestamp): string
    {
        $timestamp = trim((string) ($timestamp ?? time()));

        if ($timestamp === '') {
            throw new InvalidArgumentException('Timestamp для подписи не может быть пустым.');
        }

        return $timestamp;
    }

    /**
     * Вернуть nonce запроса.
     */
    private static function nonce(?string $nonce): string
    {
        $nonce = trim((string) ($nonce ?? bin2hex(random_bytes(16))));

        if ($nonce === '') {
            throw new InvalidArgumentException('Nonce для подписи не может быть пустым.');
        }

        return $nonce;
    }
}
