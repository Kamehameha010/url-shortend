export interface ShortendUrlRequest {
    name: string,
    description: string,
    url: string
}

export interface Response {
    message: string,
    status: number,
    detail?: string
}

interface ShortendUrlResponseBase {
    name?: string,
    description?: string,
    url: string,
    created_at: number | string,
}
export interface ShortendUrlCreatedResponse extends Response {
    url?: string
}

export interface ShortendUrlResponse extends ShortendUrlResponseBase {
    updated_at: number | string
}

export interface ShortendUrlStatsResponse extends ShortendUrlResponseBase {
    short_code: string,
    click_count: number,
    updated_at: number
}