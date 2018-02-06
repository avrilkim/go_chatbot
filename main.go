package main

import (
	"github.com/JonathanMH/goClacks/echo"
	"github.com/labstack/echo"
	"chatbot/controllers"
	"github.com/labstack/echo/middleware"
)

func main() {
	// Echo instance
	e := echo.New()
	e.Static("/public/*", "public")
	e.Use(goClacks.Terrify)


	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	//CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))
	e.File("/", "public/chatbot.html")
	e.File("/test", "public/chatbot_test.html")
	//e.GET("/message", controllers.KakaoKeyboard())
	e.POST("/message", controllers.KakaoMessage())

	e.Logger.Fatal(e.Start(":3000"))


}

