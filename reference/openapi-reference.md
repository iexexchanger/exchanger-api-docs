# Interactive API reference

GitBook can render an interactive API reference from OpenAPI.

## Options

Use one of these sources:

| Source | When to use |
| --- | --- |
| `openapi/openapi.yaml` | When GitBook imports the specification from this GitHub repository. |
| `https://{your-domain}/api/v3/openapi.yaml` | When GitBook should read the live specification from an installation. |

For local examples in this documentation, the base URL is:

```text
https://example.com/api/v3
```

For your production documentation, replace `example.com` with the real exchange domain.

## GitBook setup

1. Open GitBook space.
2. Add an OpenAPI block or API Reference section.
3. Choose file import or URL import.
4. Use tags to group endpoints by area: System, Client, Orders, Exchange, Files, Verifications, Sandbox, Reviews, Partner, Platform, Webhooks, Security.
5. Keep Markdown guides as the conceptual documentation and OpenAPI as the exact endpoint reference.

## Recommended split

| Markdown guide | API Reference tags |
| --- | --- |
| Exchange | Exchange, Files, Verifications, Sandbox |
| Webhooks | Webhooks |
| Client and usage | Client, Platform |
| Orders | Orders |
| Partner | Partner |
| Security | Security |

