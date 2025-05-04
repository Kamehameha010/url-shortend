package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New(fiber.Config{
		ETag:    true,
		AppName: "UrlShortend",
	})

	app.Get("/status", func(c *fiber.Ctx) error {
		return c.SendString("Server running...")
	})
	router := app.Group("/url-shortend")
	router.Post("/", NewUrl)
	router.Get("/:code", RedirectUrl)
	router.Put("/:code", UpdateUrl)
	router.Delete("/:code", DeleteUrl)
	router.Get("/:code/detail", GetUrlByCode)

	app.Listen(":9900")

}
