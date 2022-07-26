
import type { JSONSchema7 } from 'json-schema'

export type AsyncAPI = {
    asyncapi: '2.4.0' | string,
    id?: string,
    info: Info,

    servers?: {
        [serverName: string]: Server
    },

    defaultContentType?: string,

    channels: {
        [channelName: string]: Channel
    },

    components?: Components,
    tags?: Tag[],
    externalDocs?: ExternalDoc,

    [xtra: `x-${string}`]: any
}

export type UrlString = string
export type CommonMark = string

export type Info = {
    title: string,
    version: string,
    description?: CommonMark,
    termsOfService?: UrlString,
    contact?: Contact,
    license?: License,

    [xtra: `x-${string}`]: any
}

export type Contact = {
    name?: string,
    url?: UrlString,
    email?: string,

    [xtra: `x-${string}`]: any
}

export type License = {
    name: string,
    url?: UrlString,

    [xtra: `x-${string}`]: any
}

export type Server = {
    url: UrlString,
    protocol: string,
    protocolVersion?: string,
    description?: CommonMark,
    variables?: {
        [varName: string]: ServerVariable
    },
    security?: SecurityRequirement[],
    bindings?: ServerBindings | Ref,

    [xtra: `x-${string}`]: any
}

export type ServerVariable = {
    enum?: string[],
    default?: string,
    description?: CommonMark,
    examples?: string[],

    [xtra: `x-${string}`]: any
}

export type SecurityRequirement = {
    [name in SecurityScheme['type']]?: string[]
}

export type SecurityScheme = {
        type: 'httpApiKey',
        description?: CommonMark,
        name: string,
        in: 'query' | 'header' | 'cookie',

        [xtra: `x-${string}`]: any
    }
    | {
        type: 'apiKey',
        description?: CommonMark,
        in: 'user' | 'password',

        [xtra: `x-${string}`]: any
    }
    | {
        type: 'http',
        description?: CommonMark,
        scheme: 'basic' | 'bearer' | string,
        bearerFormat?: 'JWT' | string,

        [xtra: `x-${string}`]: any
    }
    | {
        type: 'oauth',
        description?: CommonMark,
        flows: OAuthFlows,

        [xtra: `x-${string}`]: any
    }
    | {
        type: 'openIdConnect',
        description?: CommonMark,
        openIdConnectUrl: UrlString,

        [xtra: `x-${string}`]: any
    }
    | {
        type: 'userPassword' | 'X509' | 'symmetricEncryption' | 'asymmetricEncryption' | 'plain'
            | 'scramSha256' | 'scramSha512' | 'gssapi',
        description?: CommonMark,

        [xtra: `x-${string}`]: any
    }

export type OAuthFlows = {
    implicit?: OAuthFlow_AuthUrl,
    password?: OAuthFlow_TokenUrl,
    clientCredentials?: OAuthFlow_TokenUrl,
    authorizationCode?: OAuthFlow_AuthUrl | OAuthFlow_TokenUrl,

    [xtra: `x-${string}`]: any
}

export type OAuthFlow_AuthUrl = {
    authorizationUrl: UrlString,
    refreshUrl?: UrlString,
    scopes: { [scopeName: string]: CommonMark /* description */ },

    [xtra: `x-${string}`]: any
}

export type OAuthFlow_TokenUrl = {
    tokenUrl: UrlString,
    refreshUrl?: UrlString,
    scopes: { [scopeName: string]: CommonMark /* description */ },

    [xtra: `x-${string}`]: any
}

export type ServerBindings = {
    http: {},
    ws: {},
    kafka: {},
    sns: {},
    sqs: {},
    redis: {},

    [protocol: string]: any
}

export type OperationBindings = {
    http?: {
            type: 'request',
            method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE',
            query?: Schema | Ref,
            bindingVersion?: string
        }
        | {
            type: 'response',
            query?: Schema | Ref,
            bindingVersion?: string
        },

    kafka?: {
        groupId?: Schema | Ref,
        clientId?: Schema | Ref,
        bindingVersion?: string
    },

    [protocol: string]: any
}

export type ChannelBindings = {
    ws?: {
        method?: 'GET' | 'POST',
        query?: Schema | Ref,
        headers?: Schema | Ref,
        bindingVersion?: string
    },

    [protocol: string]: any
}

export type MessageBindings = {
    http?: {
        headers?: Schema | Ref,
        bindingVersion?: string
    },

    kafka?: {
        key?: Schema | Ref,
        bindingVersion?: string
    },

    [protocol: string]: any
}

export type Channel = {
    description?: CommonMark,
    servers?: string[],
    subscribe?: Operation,
    publish?: Operation,
    parameters: {
        [param: string]: Parameter | Ref
    },
    bindings: ChannelBindings | Ref,

    [xtra: `x-${string}`]: any
}

export type Operation = {
    operationId: string,
    summary?: string,
    description?: CommonMark,
    security?: SecurityRequirement[],
    tags?: Tag[],
    externalDocs?: ExternalDoc,
    bindings?: OperationBindings | Ref,
    traits?: (OperationTrait | Ref)[],
    message?: Message | Ref | { oneOf: (Message | Ref)[] },

    [xtra: `x-${string}`]: any
}

export type OperationTrait = {
    operationId: string,
    summary?: string,
    description?: CommonMark,
    security?: SecurityRequirement[],
    tags?: Tag[],
    externalDocs?: ExternalDoc,
    bindings?: (OperationBindings | Ref)[],

    [xtra: `x-${string}`]: any
}

export type Message = {
    messageId: string,
    headers?: Schema | Ref,
    payload?: Schema | any,
    correlationId?: CorrelationId | Ref,
    schemaFormat?: string,
    contentType?: string,
    name?: string,
    title?: string,
    summary?: string,
    description?: CommonMark,
    tags?: Tag[],
    externalDocs?: ExternalDoc,
    bindings?: MessageBindings | Ref,
    examples?: MessageExample,
    traits?: MessageTrait | Ref,

    [xtra: `x-${string}`]: any
}

export type CorrelationId = {
    location: string,
    description?: CommonMark,

    [xtra: `x-${string}`]: any
}

export type MessageExample = {
    headers?: { [key: string]: any },
    payload?: any,
    name?: string,
    summary?: string,

    [xtra: `x-${string}`]: any
}

export type MessageTrait = {
    messageId: string,
    headers?: Schema | Ref,
    correlationId?: CorrelationId | Ref,
    schemaFormat?: string,
    contentType?: string,
    name?: string,
    title?: string,
    summary?: string,
    description?: CommonMark,
    tags?: Tag[],
    externalDocs?: ExternalDoc,
    bindings?: MessageBindings | Ref,
    examples?: MessageExample,
    traits?: MessageTrait | Ref,

    [xtra: `x-${string}`]: any
}

export type Components = {
    schemas?:           { [name: string]: Schema | Ref },
    servers?:           { [name: string]: Server | Ref },
    serverVariables?:   { [name: string]: ServerVariable | Ref },
    channels?:          { [name: string]: Channel },
    messages?:          { [name: string]: Message | Ref },
    securitySchemes?:   { [name: string]: SecurityScheme | Ref },
    parameters?:        { [name: string]: Parameter | Ref },
    correlationIds?:    { [name: string]: CorrelationId | Ref },
    operationTraits?:   { [name: string]: OperationTrait | Ref },
    messageTraits?:     { [name: string]: MessageTrait | Ref },
    serverBindings?:    { [name: string]: ServerBindings | Ref },
    channelBindings?:   { [name: string]: ChannelBindings | Ref },
    operationBindings?: { [name: string]: OperationBindings | Ref },
    messageBindings?:   { [name: string]: MessageBindings | Ref },

    [xtra: `x-${string}`]: any
}

export interface Schema extends JSONSchema7 {
    discriminator?: string,
    externalDocs?: ExternalDoc,
    deprecated?: boolean,

    [xtra: `x-${string}`]: any
}

export type Parameter = {
    description?: CommonMark,
    schema?: Schema | Ref,
    location?: string,

    [xtra: `x-${string}`]: any
}

export type Tag = {
    name: string,
    description?: CommonMark,
    externalDocs?: ExternalDoc,

    [xtra: `x-${string}`]: any
}

export type ExternalDoc = {
    description?: CommonMark,
    url: UrlString,

    [xtra: `x-${string}`]: any
}

export type Ref = {
    $ref: string
}
