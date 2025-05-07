package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/etag"
)

func main() {
	app := fiber.New(fiber.Config{
		AppName: "UrlShortend",
	})

	app.Use(cors.New())
	app.Use(etag.New())

	app.Get("/status", func(c *fiber.Ctx) error {
		return c.SendString("Server running...")
	})
	app.Get("/:code", RedirectUrl)
	router := app.Group("/shortend")
	router.Post("/", NewUrl)
	router.Get("/:code/stats", GetUrlStatsByCode)
	router.Put("/:code", UpdateUrl)
	router.Delete("/:code", DeleteUrl)
	router.Get("/:code/detail", GetUrlByCode)
	app.Listen(fmt.Sprintf(":%s", os.Getenv("SERVER_PORT")))

}
