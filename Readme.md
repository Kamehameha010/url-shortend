# URL Shortend

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Kamehameha010/url-shortend)

A simple and modern URL shortener project inspired by the [roadmap.sh URL Shortening Service project](https://roadmap.sh/projects/url-shortening-service). This monorepo contains a Go backend RESTful API and a React + Vite frontend UI for shortening URLs, retrieving original URLs, updating, deleting, and tracking statistics for short URLs.

![Architecture](ui/url-shortend-ui/docs/images/url-shortend.gif)

## Features
- Create short URLs for long links
- Retrieve the original URL from a short code
- Update or delete existing short URLs
- Track and view statistics (e.g., access count) for each short URL
- Modern web UI for easy interaction

## Tech Stack
- **Backend:** Go, Fiber, PostgreSQL
- **Frontend:** React, Vite, TailwindCSS

## Project Structure
- [Backend README](backend/README.md) — Go API for URL shortening and statistics
- [Frontend UI README](ui/url-shortend-ui/README.md) — React + Vite web interface

---

See each subproject's README for setup, environment variables, and usage instructions.