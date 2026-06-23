export type ApiEnvelope<T> = {
    state: 0
    message: string
    result: T
    meta: ApiMeta
}

export type ApiErrorEnvelope = {
    state: 1
    message: string
    code: number
    error: {
        code: string
        type?: string
        details?: unknown
    }
    meta: ApiMeta
}

export type ApiMeta = {
    request_id: string
    correlation_id?: string
    timestamp: string
    pagination?: {
        mode?: 'page' | 'cursor'
        current_page?: number | null
        per_page: number
        total?: number | null
        last_page?: number | null
        cursor?: string | null
        next_cursor?: string | null
        has_more: boolean
    }
}

export type PublicApiClientOptions = {
    baseUrl?: string
    bearerToken?: string
    hmacSecret?: string
    fetcher?: typeof fetch
}

export type ListParams = {
    page?: number
    per_page?: number
    pagination?: 'page' | 'cursor'
    cursor?: string
    sort?: string
    filter?: Record<string, string | number | boolean | Array<string | number>>
}

export type RequestOptions = {
    query?: ListParams
    body?: unknown
    idempotencyKey?: string
    correlationId?: string
}

export type ApiScope = {
    scope: string
    group: string
    title: string
    description: string
    risk: 'low' | 'standard' | 'medium' | 'high'
    grantable: boolean
    endpoints: string[]
}

export type ApiTokenSummary = {
    id: number
    name: string
    scopes: string[]
    scope_details: ApiScope[]
    security: {
        hmac_required: boolean
        hmac_verified: boolean
        signature_algorithm: string
    }
    last_used_at: string | null
    expires_at: string | null
}

export type UsagePeriod = {
    limit: number | null
    used: number
    remaining: number | null
    resets_at: string
}

export type UsageSummary = {
    api_token: {
        id: number
        name: string
        status: string
        plan: string
        billable: boolean
    } | null
    quota: {
        day: UsagePeriod
        month: UsagePeriod
    } | null
    billing: {
        currency: string
        unit_price: string
        billable_units: number
        estimated_amount: string
    } | null
    usage: Record<string, {
        requests: number
        errors: number
        billable_units: number
        total_duration_ms: number
    }>
}

export type ContractVersion = {
    key: string
    version: string
    title: string
    status: 'current' | string
    stability: 'stable' | string
    description: string
    headers: string[]
    schemas: string[]
}

export type SchemaRegistryItem = {
    key: string
    title: string
    version: string
    contract: string
    content_type: string
    endpoint: string
}

export type ClientApiHealth = {
    version: 'client-health-v1'
    status: 'ok' | 'warning' | 'blocked'
    client: Record<string, unknown>
    token: Record<string, unknown> | null
    security: Record<string, unknown> | null
    quota: UsageSummary['quota']
    webhooks: Record<string, unknown>
    contracts: Record<string, unknown>
    time: string
}

export type WebhookEndpoint = {
    id: string
    name: string
    url: string
    events: string[]
    status: 'active' | 'paused' | 'disabled'
    signing_algorithm: string
    secret_fingerprint?: string | null
    secret?: string
    failure_count: number
    last_delivery_at?: string | null
    last_success_at?: string | null
    last_failure_at?: string | null
    created_at?: string | null
    updated_at?: string | null
}

export type WebhookEventCatalogItem = {
    event: string
    title: string
}

export type WebhookEndpointInput = {
    name: string
    url: string
    events: string[]
}

export type WebhookEndpointUpdate = Partial<WebhookEndpointInput> & {
    status?: 'active' | 'paused' | 'disabled'
}

export type WebhookTestInput = {
    endpoint_id?: string
    event_type?: string
    payload?: Record<string, unknown>
}

export type WebhookTestResult = {
    event: {
        id: string
        type: string
        status: string
        request_id: string
        correlation_id: string
    }
    deliveries: Array<{
        id: string
        status: string
        endpoint_id?: string | null
    }>
}

export type WebhookEvent = {
    id: string
    type: string
    resource?: Record<string, unknown>
    status: string
    request_id?: string | null
    correlation_id?: string | null
    idempotency_key?: string | null
    payload: Record<string, unknown>
    deliveries_count: number
    deliveries?: WebhookDelivery[]
    created_at?: string | null
    updated_at?: string | null
}

export type WebhookDelivery = {
    id: string
    status: 'queued' | 'sending' | 'succeeded' | 'failed' | string
    attempt: number
    endpoint: Record<string, unknown> | null
    event: Record<string, unknown> | null
    request: Record<string, unknown>
    response: Record<string, unknown>
    error: {
        code?: string | null
        message?: string | null
    }
    next_retry_at?: string | null
    delivered_at?: string | null
    created_at?: string | null
    updated_at?: string | null
}

export type CurrencySummary = {
    id: number
    payment?: string | null
    code?: string | null
    designation?: string | null
    small_code?: string | null
    network?: string | null
    network_out?: string | null
    decimal: number
}

export type PaymentSystem = {
    id: number
    type: 'payment_system'
    name: string
    payment: {
        id: number
        name: string
        logo?: string | null
        logo_url?: string | null
    }
    currency: {
        id: number
        code: string
        sign?: string | null
    }
    codes: {
        letter?: string | null
        short?: string | null
        network_in?: string | null
        network_out?: string | null
    }
    precision: {
        amount_decimal: number
    }
    capabilities: {
        can_give: boolean
        can_receive: boolean
        income_enabled: number
        outcome_enabled: number
    }
    routes: {
        give_to: Array<{ route_id: number; currency_id: number }>
        receive_from: Array<{ route_id: number; currency_id: number }>
    }
    form: Record<string, unknown>
    notices: Record<string, unknown>
    network?: Record<string, unknown> | null
    filters: {
        ids: number[]
    }
    sorting: Record<string, number>
}

export type ExchangeRoute = {
    id: number
    status: number
    is_enabled: boolean
    name?: string | null
    from?: CurrencySummary | null
    to?: CurrencySummary | null
    limits?: Record<string, string | null>
    rate?: {
        type?: 'fixed' | 'selectable'
        course?: string | null
        is_type_rate?: boolean
        default_type_rate?: 0 | 1
        modes?: Record<string, unknown>
    }
    features?: Record<string, unknown>
    sorting?: Record<string, number>
    timestamps?: Record<string, string | null>
}

export type ExchangeRouteDetail = {
    route: ExchangeRoute
    operation: Record<string, unknown>
    snapshot?: RouteSnapshot
    operation_contract?: OperationContract
    contract: {
        quote_endpoint: string
        preflight_endpoint?: string
        order_endpoint: string
        amount_side: 'give'
        currency_fields: string[]
    }
}

export type RouteSnapshot = {
    version: string
    route_id: number
    hash: string
    generated_at: string
    expires_at: string
    fingerprint?: Record<string, unknown>
}

export type OperationContract = {
    version: string
    route: ExchangeRoute
    operation: Record<string, unknown>
    snapshot: RouteSnapshot
    contract: Record<string, unknown>
}

export type RouteCapabilities = {
    version: 'route-capabilities-v1'
    route_id: number
    status: Record<string, unknown>
    actions: Record<string, unknown>
    amounts: Record<string, unknown>
    rate: Record<string, unknown>
    fields: Array<Record<string, unknown>>
    dynamic_fields: Record<string, unknown>
    requirements: VerificationRequirements | null
    files: Record<string, unknown>
    endpoints: Record<string, string>
    snapshot: RouteSnapshot
    operation_contract: OperationContract
}

export type ExchangeQuoteInput = {
    route_id?: number
    direction_id?: number
    income_payment_system?: number
    outcome_payment_system?: number
    from_currency_id?: number
    to_currency_id?: number
    from?: string
    to?: string
    from_code?: string
    to_code?: string
    amount?: string | number
    income_amount?: string | number
    city_id?: number
    type_rate?: 0 | 1 | '0' | '1' | 'fixed' | 'floating'
    selected_fee_type?: string
    selected_fees?: Record<string, unknown>
    selector_fees?: Record<string, unknown>
    checkbox_fees?: Record<string, unknown>
    card_verification_required?: boolean
}

export type ExchangeQuote = {
    route: ExchangeRoute
    amounts: {
        give: string
        receive: string
    }
    components: Array<Record<string, unknown>>
    rate: {
        display: string
        value: string
        source?: 'calculation'
        selected?: 'fixed' | 'floating' | null
        modes?: Record<string, {
            key?: string
            value?: string
            display?: string
            selected?: boolean
            type_rate?: 0 | 1
        }>
    }
    base_rate?: {
        display: string
        value: string
        source?: 'direction'
        selected?: 'fixed' | 'floating' | null
        modes?: Record<string, {
            key?: string
            value?: string
            display?: string
            selected?: boolean
            type_rate?: 0 | 1
        }>
        note?: string
    }
    adjustments?: {
        city_id?: number | null
        selected_fee_type?: string | null
        selected_fees?: unknown[]
        selector_fees?: unknown[]
        checkbox_fees?: unknown[]
        card_verification_required?: boolean
    }
    promo: {
        applied: boolean
        base_receive_amount: string
    }
    task_payload: Record<string, unknown>
}

export type ExchangeOrderPreflightInput = ExchangeQuoteInput & {
    income_account?: string
    outcome_account?: string
    direction_fields?: Record<string, unknown>
    user_fields?: Record<string, unknown>
    checkbox_agreements?: Record<string, unknown>
    snapshot?: RouteSnapshot
}

export type ExchangeOrderPreflight = {
    allowed: boolean
    can_create_order: boolean
    missing_fields: Array<{ field: string; type: string; message: string }>
    quote: ExchangeQuote
    operation_contract: OperationContract
    requirements: VerificationRequirements
    snapshot: RouteSnapshot
}

export type ExchangeOrderCreateInput = {
    route_id?: number
    direction_id?: number
    income_amount?: string | number
    amount?: string | number
    outcome_amount?: string | number
    receive_amount?: string | number
    income_payment_system?: number
    outcome_payment_system?: number
    from_currency_id?: number
    to_currency_id?: number
    from?: string
    to?: string
    from_code?: string
    to_code?: string
    email?: string
    income_account?: string
    outcome_account?: string
    from_requisite?: string
    to_requisite?: string
    fields_in?: Record<string, unknown>
    fields_out?: Record<string, unknown>
    direction_fields?: Record<string, unknown>
    user_fields?: Record<string, unknown>
    extra_out?: Record<string, unknown>
    selected_fees?: Record<string, unknown>
    selector_fees?: Record<string, unknown>
    checkbox_agreements?: Record<string, unknown>
    city_id?: number
    type_rate?: 0 | 1 | '0' | '1' | 'fixed' | 'floating'
    promo_code?: string
    snapshot?: RouteSnapshot
}

export type ExchangeOrderConfirmInput = {
    type: 'paid' | 'unpaid'
    income_code?: string
    num_tx?: string | null
    note_tx?: string | null
}

export type Order = Record<string, unknown> & {
    id: number
    public_id: string
    tracking_id?: string | null
    status?: {
        id: number
        key: string
        name: string
        is_final: boolean
        is_payment_flow: boolean
        is_problem: boolean
    }
}

export type OrderActions = {
    status: Record<string, unknown>
    allowed_actions: Record<string, { allowed: boolean; method?: string; endpoint?: string; payload?: Record<string, unknown> }>
    transitions: Array<{ id: number; key: string }>
    requirements: VerificationRequirements
}

export type UploadIntentCreateInput = {
    purpose: 'identity_verification' | 'card_verification' | 'order_attachment' | 'sandbox'
    resource_type?: string
    resource_id?: string
    field_key?: string
    allowed_extensions?: string[]
    max_bytes?: number
}

export type UploadIntent = {
    id: number
    uuid: string
    purpose: string
    resource_type?: string | null
    resource_id?: string | null
    field_key?: string | null
    status: 'pending' | 'committed' | 'consumed' | 'expired'
    allowed_extensions: string[]
    max_bytes: number
    file: Record<string, unknown>
    expires_at?: string | null
    committed_at?: string | null
    consumed_at?: string | null
}

export type VerificationStatus = {
    id?: number | null
    key: 'not_submitted' | 'pending' | 'approved' | 'rejected'
    label: string
    is_final_approved: boolean
    verification_id?: number
}

export type VerificationRequirements = {
    route_id?: number | null
    order?: Record<string, unknown> | null
    identity: {
        required: boolean
        mode?: string | null
        description?: string | null
        current: VerificationStatus
        create_endpoint: string
    }
    card: {
        required: boolean
        mode?: number | null
        description?: string | null
        settings?: Record<string, unknown> | null
        current: VerificationStatus
        create_endpoint: string
    }
    files?: Record<string, unknown> | null
}

export type IdentityVerificationCreateInput = {
    full_name?: string
    file_intents: string[]
}

export type CardVerificationCreateInput = {
    order?: string | number
    order_id?: string | number
    currency_id?: number
    card_number: string
    name?: string
    file_intent: string
}

export type Verification = Record<string, unknown> & {
    id: number
    uuid?: string | null
    status: VerificationStatus
}

export type OrderVerificationSubmitInput = {
    identity?: IdentityVerificationCreateInput
    card?: CardVerificationCreateInput
}

export type Review = {
    id: number
    status: {
        id: number
        name: 'published' | 'moderation'
        is_published: boolean
    }
    name?: string | null
    text?: string | null
    rating: number
    order?: Record<string, unknown> | null
    timestamps?: Record<string, string | null>
}

export type ReviewCreateInput = {
    name: string
    text: string
    rating?: number
    rate_speed?: number
    order_id?: string | number
    tracking_id?: string
}

export type ClientProfile = Record<string, unknown> & {
    api_token?: ApiTokenSummary | null
}

export class PublicApiError extends Error {
    constructor(
        public readonly response: ApiErrorEnvelope,
        public readonly status: number,
    ) {
        super(response.message)
    }
}

export class PublicApiClient {
    private readonly baseUrl: string
    private readonly bearerToken?: string
    private readonly hmacSecret?: string
    private readonly fetcher: typeof fetch

    constructor(options: PublicApiClientOptions = {}) {
        this.baseUrl = (options.baseUrl ?? '/api/v3').replace(/\/+$/, '')
        this.bearerToken = options.bearerToken
        this.hmacSecret = options.hmacSecret
        this.fetcher = options.fetcher ?? fetch
    }

    async ping(): Promise<ApiEnvelope<{ status: string; site_name: string; time: string }>> {
        return this.request('GET', '/ping')
    }

    async client(): Promise<ApiEnvelope<ClientProfile>> {
        return this.request('GET', '/private/client', undefined, true)
    }

    async scopes(): Promise<ApiEnvelope<{ scopes: ApiScope[] }>> {
        return this.request('GET', '/private/scopes', undefined, true)
    }

    async usage(): Promise<ApiEnvelope<UsageSummary>> {
        return this.request('GET', '/private/usage', undefined, true)
    }

    async clientHealth(): Promise<ApiEnvelope<{ health: ClientApiHealth }>> {
        return this.request('GET', '/private/health/client', undefined, true)
    }

    async publicContracts(): Promise<ApiEnvelope<{ contracts: ContractVersion[] }>> {
        return this.request('GET', '/public/contracts')
    }

    async publicContract(contract: string): Promise<ApiEnvelope<{ contract: ContractVersion }>> {
        return this.request('GET', `/public/contracts/${encodeURIComponent(contract)}`)
    }

    async contracts(): Promise<ApiEnvelope<{ contracts: ContractVersion[] }>> {
        return this.request('GET', '/private/contracts', undefined, true)
    }

    async contract(contract: string): Promise<ApiEnvelope<{ contract: ContractVersion }>> {
        return this.request('GET', `/private/contracts/${encodeURIComponent(contract)}`, undefined, true)
    }

    async publicSchemas(): Promise<ApiEnvelope<{ schemas: SchemaRegistryItem[] }>> {
        return this.request('GET', '/public/schemas')
    }

    async publicSchema(schema: string): Promise<ApiEnvelope<{ schema: Record<string, unknown> }>> {
        return this.request('GET', `/public/schemas/${encodeURIComponent(schema)}`)
    }

    async schemas(): Promise<ApiEnvelope<{ schemas: SchemaRegistryItem[] }>> {
        return this.request('GET', '/private/schemas', undefined, true)
    }

    async schema(schema: string): Promise<ApiEnvelope<{ schema: Record<string, unknown> }>> {
        return this.request('GET', `/private/schemas/${encodeURIComponent(schema)}`, undefined, true)
    }

    async webhooks(): Promise<ApiEnvelope<{
        endpoints: WebhookEndpoint[]
        events: WebhookEventCatalogItem[]
        limits: Record<string, number>
    }>> {
        return this.request('GET', '/private/webhooks', undefined, true)
    }

    async createWebhook(
        input: WebhookEndpointInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ endpoint: WebhookEndpoint }>> {
        return this.request('POST', '/private/webhooks', { body: input, ...options }, true)
    }

    async updateWebhook(
        webhookId: string,
        input: WebhookEndpointUpdate,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ endpoint: WebhookEndpoint }>> {
        return this.request('PATCH', `/private/webhooks/${encodeURIComponent(webhookId)}`, { body: input, ...options }, true)
    }

    async deleteWebhook(
        webhookId: string,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ deleted: boolean; id: string }>> {
        return this.request('DELETE', `/private/webhooks/${encodeURIComponent(webhookId)}`, options, true)
    }

    async rotateWebhookSecret(
        webhookId: string,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ endpoint: WebhookEndpoint }>> {
        return this.request('POST', `/private/webhooks/${encodeURIComponent(webhookId)}/rotate-secret`, options, true)
    }

    async testWebhook(
        input: WebhookTestInput = {},
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<WebhookTestResult>> {
        return this.request('POST', '/private/webhooks/test', { body: input, ...options }, true)
    }

    async webhookEvents(params: ListParams = {}): Promise<ApiEnvelope<{ events: WebhookEvent[] }>> {
        return this.request('GET', '/private/webhooks/events', params, true)
    }

    async webhookEvent(eventId: string): Promise<ApiEnvelope<{ event: WebhookEvent }>> {
        return this.request('GET', `/private/webhooks/events/${encodeURIComponent(eventId)}`, undefined, true)
    }

    async webhookDeliveries(params: ListParams = {}): Promise<ApiEnvelope<{ deliveries: WebhookDelivery[] }>> {
        return this.request('GET', '/private/webhooks/deliveries', params, true)
    }

    async webhookDelivery(deliveryId: string): Promise<ApiEnvelope<{ delivery: WebhookDelivery }>> {
        return this.request('GET', `/private/webhooks/deliveries/${encodeURIComponent(deliveryId)}`, undefined, true)
    }

    async retryWebhookDelivery(
        deliveryId: string,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ delivery: WebhookDelivery }>> {
        return this.request('POST', `/private/webhooks/deliveries/${encodeURIComponent(deliveryId)}/retry`, options, true)
    }

    async exchangeRoutes(params: ListParams = {}): Promise<ApiEnvelope<ExchangeRoute[]>> {
        return this.request('GET', '/private/exchange/routes', params, true)
    }

    async exchangePaymentSystems(params: ListParams = {}): Promise<ApiEnvelope<PaymentSystem[]>> {
        return this.request('GET', '/private/exchange/payment-systems', params, true)
    }

    async exchangeRoute(routeId: string | number): Promise<ApiEnvelope<ExchangeRoute>> {
        return this.request('GET', `/private/exchange/routes/${encodeURIComponent(String(routeId))}`, undefined, true)
    }

    async exchangeRouteDetails(routeId: string | number): Promise<ApiEnvelope<ExchangeRouteDetail>> {
        return this.request('GET', `/private/exchange/routes/${encodeURIComponent(String(routeId))}/details`, undefined, true)
    }

    async exchangeRouteCapabilities(routeId: string | number): Promise<ApiEnvelope<{ capabilities: RouteCapabilities }>> {
        return this.request('GET', `/private/exchange/routes/${encodeURIComponent(String(routeId))}/capabilities`, undefined, true)
    }

    async exchangeRouteDetailsByPair(
        params: { route_id?: number; direction_id?: number; from_currency_id?: number; to_currency_id?: number; from?: string; to?: string },
    ): Promise<ApiEnvelope<ExchangeRouteDetail>> {
        return this.request('GET', '/private/exchange/routes/details', params as unknown as ListParams, true)
    }

    async exchangeRouteDetailsByCurrencyIds(
        fromCurrencyId: string | number,
        toCurrencyId: string | number,
    ): Promise<ApiEnvelope<ExchangeRouteDetail>> {
        return this.request(
            'GET',
            `/private/exchange/routes/${encodeURIComponent(String(fromCurrencyId))}/${encodeURIComponent(String(toCurrencyId))}/details`,
            undefined,
            true,
        )
    }

    async exchangeRouteCapabilitiesByCurrencyIds(
        fromCurrencyId: string | number,
        toCurrencyId: string | number,
    ): Promise<ApiEnvelope<{ capabilities: RouteCapabilities }>> {
        return this.request(
            'GET',
            `/private/exchange/routes/${encodeURIComponent(String(fromCurrencyId))}/${encodeURIComponent(String(toCurrencyId))}/capabilities`,
            undefined,
            true,
        )
    }

    async quoteExchange(input: ExchangeQuoteInput): Promise<ApiEnvelope<{ quote: ExchangeQuote; snapshot: RouteSnapshot }>> {
        return this.request('POST', '/private/exchange/quotes', { body: input }, true)
    }

    async preflightExchangeOrder(input: ExchangeOrderPreflightInput): Promise<ApiEnvelope<{ preflight: ExchangeOrderPreflight }>> {
        return this.request('POST', '/private/exchange/orders/preflight', { body: input }, true)
    }

    async createExchangeOrder(
        input: ExchangeOrderCreateInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ order: Order }>> {
        return this.request('POST', '/private/exchange/orders', { body: input, ...options }, true)
    }

    async exchangeOrder(order: string | number): Promise<ApiEnvelope<Order>> {
        return this.request('GET', `/private/exchange/orders/${encodeURIComponent(String(order))}`, undefined, true)
    }

    async exchangeOrderStatus(order: string | number): Promise<ApiEnvelope<{ status: unknown; order: Order }>> {
        return this.request('GET', `/private/exchange/orders/${encodeURIComponent(String(order))}/status`, undefined, true)
    }

    async exchangeOrderActions(order: string | number): Promise<ApiEnvelope<{ actions: OrderActions }>> {
        return this.request('GET', `/private/exchange/orders/${encodeURIComponent(String(order))}/actions`, undefined, true)
    }

    async confirmExchangeOrder(
        order: string | number,
        input: ExchangeOrderConfirmInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ order: Order }>> {
        return this.request('POST', `/private/exchange/orders/${encodeURIComponent(String(order))}/confirm`, { body: input, ...options }, true)
    }

    async cancelExchangeOrder(
        order: string | number,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ order: Order }>> {
        return this.request('POST', `/private/exchange/orders/${encodeURIComponent(String(order))}/cancel`, options, true)
    }

    async createUploadIntent(
        input: UploadIntentCreateInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ upload_intent: UploadIntent }>> {
        return this.request('POST', '/private/files/upload-intents', { body: input, ...options }, true)
    }

    async uploadIntent(intent: string): Promise<ApiEnvelope<{ upload_intent: UploadIntent }>> {
        return this.request('GET', `/private/files/upload-intents/${encodeURIComponent(intent)}`, undefined, true)
    }

    async commitUploadIntent(
        intent: string,
        file: Blob,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ upload_intent: UploadIntent }>> {
        const form = new FormData()
        form.set('file', file)

        return this.requestMultipart('POST', `/private/files/upload-intents/${encodeURIComponent(intent)}/commit`, form, file, options, true)
    }

    async verificationRequirements(
        query: { order?: string | number; route_id?: number; income_payment_system?: number; outcome_payment_system?: number },
    ): Promise<ApiEnvelope<{ requirements: VerificationRequirements }>> {
        return this.request('GET', '/private/verifications/requirements', query as unknown as ListParams, true)
    }

    async createIdentityVerification(
        input: IdentityVerificationCreateInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ verification: Verification }>> {
        return this.request('POST', '/private/verifications/identity', { body: input, ...options }, true)
    }

    async identityVerification(verification: string | number): Promise<ApiEnvelope<{ verification: Verification }>> {
        return this.request('GET', `/private/verifications/identity/${encodeURIComponent(String(verification))}`, undefined, true)
    }

    async identityVerificationActions(verification: string | number): Promise<ApiEnvelope<{ actions: Record<string, unknown> }>> {
        return this.request('GET', `/private/verifications/identity/${encodeURIComponent(String(verification))}/actions`, undefined, true)
    }

    async createCardVerification(
        input: CardVerificationCreateInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ verification: Verification }>> {
        return this.request('POST', '/private/verifications/cards', { body: input, ...options }, true)
    }

    async cardVerification(verification: string | number): Promise<ApiEnvelope<{ verification: Verification }>> {
        return this.request('GET', `/private/verifications/cards/${encodeURIComponent(String(verification))}`, undefined, true)
    }

    async cardVerificationActions(verification: string | number): Promise<ApiEnvelope<{ actions: Record<string, unknown> }>> {
        return this.request('GET', `/private/verifications/cards/${encodeURIComponent(String(verification))}/actions`, undefined, true)
    }

    async orderVerifications(order: string | number): Promise<ApiEnvelope<{ requirements: VerificationRequirements }>> {
        return this.request('GET', `/private/exchange/orders/${encodeURIComponent(String(order))}/verifications`, undefined, true)
    }

    async submitOrderVerification(
        order: string | number,
        input: OrderVerificationSubmitInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ submitted: Record<string, Verification>; requirements: VerificationRequirements }>> {
        return this.request('POST', `/private/exchange/orders/${encodeURIComponent(String(order))}/verifications/submit`, { body: input, ...options }, true)
    }

    async simulateExchangeOrder(
        input: ExchangeOrderPreflightInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ simulation: Record<string, unknown> }>> {
        return this.request('POST', '/private/sandbox/exchange/orders/simulate', { body: input, ...options }, true)
    }

    async reviews(params: ListParams = {}): Promise<ApiEnvelope<Review[]>> {
        return this.request('GET', '/private/reviews', params, true)
    }

    async createReview(
        input: ReviewCreateInput,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
    ): Promise<ApiEnvelope<{ review: Review }>> {
        return this.request('POST', '/private/reviews', { body: input, ...options }, true)
    }

    async orders(params: ListParams = {}): Promise<ApiEnvelope<Order[]>> {
        return this.request('GET', '/private/orders', params, true)
    }

    async orderStatuses(): Promise<ApiEnvelope<{ statuses: Array<Record<string, unknown>> }>> {
        return this.request('GET', '/public/orders/statuses')
    }

    private async request<T>(
        method: string,
        path: string,
        options?: ListParams | RequestOptions,
        authenticated = false,
    ): Promise<ApiEnvelope<T>> {
        const requestOptions = this.normalizeOptions(options)
        const url = this.buildUrl(path, requestOptions.query)
        const headers = new Headers({ Accept: 'application/json' })
        const body = requestOptions.body === undefined ? '' : JSON.stringify(requestOptions.body)

        if (authenticated) {
            if (!this.bearerToken) {
                throw new Error('Bearer token is required for this endpoint.')
            }

            headers.set('Authorization', `Bearer ${this.bearerToken}`)
        }

        if (requestOptions.idempotencyKey) {
            headers.set('Idempotency-Key', requestOptions.idempotencyKey)
        }

        if (requestOptions.correlationId) {
            headers.set('X-Correlation-Id', requestOptions.correlationId)
        }

        if (body !== '') {
            headers.set('Content-Type', 'application/json')
        }

        if (authenticated && this.hmacSecret) {
            await this.sign(headers, method, url, body)
        }

        const response = await this.fetcher(url.toString(), {
            method,
            headers,
            body: body !== '' ? body : undefined,
        })
        const payload = await response.json() as ApiEnvelope<T> | ApiErrorEnvelope

        if (!response.ok || payload.state === 1) {
            throw new PublicApiError(payload as ApiErrorEnvelope, response.status)
        }

        return payload as ApiEnvelope<T>
    }

    private async requestMultipart<T>(
        method: string,
        path: string,
        form: FormData,
        file: Blob,
        options: Pick<RequestOptions, 'idempotencyKey' | 'correlationId'> = {},
        authenticated = false,
    ): Promise<ApiEnvelope<T>> {
        const url = this.buildUrl(path)
        const headers = new Headers({ Accept: 'application/json' })
        const fileHash = await this.sha256Buffer(await file.arrayBuffer())

        if (authenticated) {
            if (!this.bearerToken) {
                throw new Error('Bearer token is required for this endpoint.')
            }

            headers.set('Authorization', `Bearer ${this.bearerToken}`)
        }

        if (options.idempotencyKey) {
            headers.set('Idempotency-Key', options.idempotencyKey)
        }

        if (options.correlationId) {
            headers.set('X-Correlation-Id', options.correlationId)
        }

        headers.set('X-Api-File-Sha256', fileHash)

        if (authenticated && this.hmacSecret) {
            await this.sign(headers, method, url, '', fileHash)
        }

        const response = await this.fetcher(url.toString(), {
            method,
            headers,
            body: form,
        })
        const payload = await response.json() as ApiEnvelope<T> | ApiErrorEnvelope

        if (!response.ok || payload.state === 1) {
            throw new PublicApiError(payload as ApiErrorEnvelope, response.status)
        }

        return payload as ApiEnvelope<T>
    }

    private normalizeOptions(options?: ListParams | RequestOptions): RequestOptions {
        if (!options) {
            return {}
        }

        if (this.isRequestOptions(options)) {
            return options
        }

        return { query: options as ListParams }
    }

    private isRequestOptions(options: ListParams | RequestOptions): options is RequestOptions {
        return 'query' in options
            || 'body' in options
            || 'idempotencyKey' in options
            || 'correlationId' in options
    }

    private buildUrl(path: string, query?: ListParams): URL {
        const base = this.baseUrl.startsWith('http')
            ? this.baseUrl
            : `${globalThis.location?.origin ?? 'http://localhost'}${this.baseUrl}`
        const url = new URL(`${base}${path}`)

        for (const [key, value] of Object.entries(query ?? {})) {
            if (value === undefined || value === null || key === 'filter') {
                continue
            }

            url.searchParams.set(key, String(value))
        }

        for (const [key, value] of Object.entries(query?.filter ?? {})) {
            if (Array.isArray(value)) {
                for (const item of value) {
                    url.searchParams.append(`filter[${key}][]`, String(item))
                }
                continue
            }

            url.searchParams.set(`filter[${key}]`, String(value))
        }

        return url
    }

    private async sign(headers: Headers, method: string, url: URL, body: string, precomputedBodyHash?: string): Promise<void> {
        const timestamp = String(Math.floor(Date.now() / 1000))
        const nonce = this.nonce()
        const canonical = [
            'v1',
            method.toUpperCase(),
            url.pathname,
            this.canonicalQuery(url),
            precomputedBodyHash ?? await this.sha256(body),
            timestamp,
            nonce,
        ].join('\n')
        const signature = await this.hmac(canonical, this.hmacSecret ?? '')

        headers.set('X-Api-Timestamp', timestamp)
        headers.set('X-Api-Nonce', nonce)
        headers.set('X-Api-Signature', `sha256=${signature}`)
    }

    private canonicalQuery(url: URL): string {
        return [...url.searchParams.entries()]
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .sort()
            .join('&')
    }

    private async sha256(value: string): Promise<string> {
        const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))

        return this.hex(bytes)
    }

    private async sha256Buffer(value: ArrayBuffer): Promise<string> {
        const bytes = await crypto.subtle.digest('SHA-256', value)

        return this.hex(bytes)
    }

    private async hmac(value: string, secret: string): Promise<string> {
        const key = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign'],
        )
        const bytes = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))

        return this.hex(bytes)
    }

    private nonce(): string {
        const bytes = new Uint8Array(16)
        crypto.getRandomValues(bytes)

        return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('')
    }

    private hex(bytes: ArrayBuffer): string {
        return [...new Uint8Array(bytes)]
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('')
    }
}
