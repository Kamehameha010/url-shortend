# URL Shortend Backend

This is the backend for the URL Shortend project, built with Go.

## Requirements

- Go 1.22 or higher

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
POSTGRES_HOST=localhost         # Database host
POSTGRES_PORT=5432              # Database port
POSTGRES_USER=youruser          # Database user
POSTGRES_PWD=yourpassword       # Database password
POSTGRES_DB=yourdb              # Database name
SERVER_DOMAIN=http://localhost:8080  # Base domain for short URLs
SERVER_PORT=8080                # Port for the server
```

## Usage

```bash
go run main.go
```

Or build and run the binary:

```bash
go build -o url-shortend.exe
./url-shortend.exe
```

## API Endpoints

### Health Check
- `GET /status` — Returns a simple status message.

### URL Shortening
- `POST /shortend/` — Create a new shortened URL.
- `GET /:shortCode` — Redirect to the original URL using the short code.
- `GET /shortend/:shortCode/detail` — Get details for a specific short code.
- `GET /shortend/:shortCode/stats` — Get statistics for a specific short code.
- `PUT /shortend/:shortCode` — Update a shortened URL.
- `DELETE /shortend/:shortCode` — Delete a shortened URL.