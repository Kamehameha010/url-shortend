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
	app.Get("/:shortCode", RedirectUrl)
	router := app.Group("/shortend")
	router.Post("/", NewUrl)
	router.Get("/:shortCode/stats", GetUrlStatsByCode)
	router.Put("/:shortCode", UpdateUrl)
	router.Delete("/:shortCode", DeleteUrl)
	router.Get("/:shortCode/detail", GetUrlByCode)
	app.Listen(fmt.Sprintf(":%s", os.Getenv("SERVER_PORT")))

}
