package main

type UrlRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Url         string `json:"url"`
}

type ShortendURL struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Url         string `json:"url"`
	ShortCode   string `json:"short_code"`
	CreatedAt   uint64 `json:"created_at"`
	UpdatedAt   uint64 `json:"updated_at"`
}

type ShortendURLStats struct {
	Url        string `json:"url"`
	ShortCode  string `json:"short_code"`
	CreatedAt  uint64 `json:"created_at"`
	UpdatedAt  uint64 `json:"updated_at"`
	ClickCount int    `json:"click_count"`
}
