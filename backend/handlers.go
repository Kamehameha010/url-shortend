package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

var (
	HOST   = os.Getenv("POSTGRES_HOST")
	PORT   = os.Getenv("POSTGRES_PORT")
	USER   = os.Getenv("POSTGRES_USER")
	PWD    = os.Getenv("POSTGRES_PWD")
	DB     = os.Getenv("POSTGRES_DB")
	DOMAIN = os.Getenv("SERVER_DOMAIN")
)

func NewUrl(ctx *fiber.Ctx) error {

	urlReq := new(UrlRequest)

	if err := ctx.BodyParser(urlReq); err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Request parsing failed",
			"detail":  "Unable to parse the request body. Please check the syntax and format of your input.",
			"status":  400,
		})
	}

	port, _ := strconv.ParseInt(PORT, 10, 64)
	db, err := GetConnection(HOST, int(port), USER, PWD, DB)

	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	code := GenerateCode(6)
	if _, err := db.Exec(`insert into link (name, description, url, code, created_at)
			 values($1,$2,$3,$4,$5)`, urlReq.Name, urlReq.Description, urlReq.Url, code, Gettimestamp()); err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	ctx.SendStatus(201)
	return ctx.JSON(fiber.Map{
		"message": "url shortend was created",
		"url":     fmt.Sprintf("%s/%s", DOMAIN, code),
		"status":  201,
	})
}

func RedirectUrl(ctx *fiber.Ctx) error {

	port, _ := strconv.ParseInt(PORT, 10, 64)
	db, err := GetConnection(HOST, int(port), USER, PWD, DB)

	code := ctx.Params("code", "")
	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	result, err := db.Query(`Select url,visitor from link where code=$1`, code)

	if err != nil {
		fmt.Println("Wrro")
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	defer result.Close()
	if !result.Next() {
		return ctx.JSON(fiber.Map{
			"message": "Not found",
			"detail":  fmt.Sprintf("Code %s was not found", code),
			"status":  404,
		})
	}

	var url string
	var visitor int

	result.Scan(&url, &visitor)

	if _, err := db.Exec(`Update link set visitor=$1 where code=$2`, (visitor + 1), code); err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	return ctx.Redirect(url, 302)
}

func GetUrlByCode(ctx *fiber.Ctx) error {

	port, _ := strconv.ParseInt(PORT, 10, 64)
	db, err := GetConnection(HOST, int(port), USER, PWD, DB)
	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	code := ctx.Params("code", "")

	result, err := db.Query(`Select name,description,url,code,created_at,updated_at from link where code=$1`, code)

	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}
	defer result.Close()

	if !result.Next() {
		return ctx.JSON(fiber.Map{
			"message": "Not found",
			"detail":  fmt.Sprintf("Code %s was not found", code),
			"status":  404,
		})
	}

	ShortendURL := new(ShortendURL)

	result.Scan(&ShortendURL.Name, &ShortendURL.Description, &ShortendURL.Url, &ShortendURL.Code, &ShortendURL.CreatedAt, &ShortendURL.UpdatedAt)

	return ctx.JSON(ShortendURL)
}

func GetUrlStatsByCode(ctx *fiber.Ctx) error {

	port, _ := strconv.ParseInt(PORT, 10, 64)
	db, err := GetConnection(HOST, int(port), USER, PWD, DB)
	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	code := ctx.Params("code", "")

	result, err := db.Query(`Select code,visitor,created_at,updated_at from link where code=$1`, code)

	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}
	defer result.Close()

	if !result.Next() {
		return ctx.JSON(fiber.Map{
			"message": "Not found",
			"detail":  fmt.Sprintf("Code %s was not found", code),
			"status":  404,
		})
	}

	ShortendURL := new(ShortendURLStats)

	result.Scan(&ShortendURL.Code, &ShortendURL.Visitor, &ShortendURL.CreatedAt, &ShortendURL.UpdatedAt)

	return ctx.JSON(ShortendURL)
}


func DeleteUrl(ctx *fiber.Ctx) error {

	port, _ := strconv.ParseInt(PORT, 10, 64)
	db, err := GetConnection(HOST, int(port), USER, PWD, DB)
	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	code := ctx.Params("code", "")

	result, err := db.Exec(`Delete from link where code=$1`, code)

	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	if rows, _ := result.RowsAffected(); rows < 1 {
		return ctx.JSON(fiber.Map{
			"message": "Not found",
			"detail":  fmt.Sprintf("Code %s was not found", code),
			"status":  404,
		})
	}

	return ctx.SendStatus(204)
}

func UpdateUrl(ctx *fiber.Ctx) error {

	urlReq := new(UrlRequest)

	if err := ctx.BodyParser(urlReq); err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Request parsing failed",
			"detail":  "Unable to parse the request body. Please check the syntax and format of your input.",
			"status":  400,
		})
	}

	port, _ := strconv.ParseInt(PORT, 10, 64)
	db, err := GetConnection(HOST, int(port), USER, PWD, DB)

	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}
	code := ctx.Params("code", "")

	result, err := db.Query(`Select url from link where code=$1`, code)

	if err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}
	defer result.Close()

	if !result.Next() {
		return ctx.JSON(fiber.Map{
			"message": "Not found",
			"detail":  fmt.Sprintf("Code %s was not found", code),
			"status":  404,
		})
	}

	var url string
	newCode := code

	result.Scan(&url)

	if url != urlReq.Url {
		newCode = GenerateCode(6)
	}

	if _, err := db.Exec(`Update link set name=$1,description=$2,url=$3,code=$4,updated_at=$5
			where code=$6`, urlReq.Name, urlReq.Description, urlReq.Url, newCode, Gettimestamp(), code); err != nil {
		return ctx.JSON(fiber.Map{
			"message": "Database connection error",
			"detail":  "Unable to establish connection to the database at this time",
			"status":  500,
		})
	}

	return ctx.SendStatus(204)
}
