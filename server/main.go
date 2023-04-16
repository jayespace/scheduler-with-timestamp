package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jayespace/scheduler-with-timestamp/controllers"
	"github.com/jayespace/scheduler-with-timestamp/initializers"
	"github.com/jayespace/scheduler-with-timestamp/middlewares"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	// Enable CORS
	// r.Use(func(c *gin.Context) {
	// 	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	// 	c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	// 	c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	// 	if c.Request.Method == "OPTIONS" {
	// 		c.AbortWithStatus(http.StatusNoContent)
	// 		return
	// 	}
	// 	c.Next()
	// })

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	r.POST("api/schedules", middlewares.RequiredAuth, controllers.CreateSchedule)
	r.GET("api/schedules", middlewares.RequiredAuth, controllers.GetSchedules)
	r.PATCH("api/schedules", middlewares.RequiredAuth, controllers.UpdateEndTime)
	r.PATCH("api/schedules/:id", middlewares.RequiredAuth, controllers.UpdateDescription)
	r.DELETE("api/schedules/:id", middlewares.RequiredAuth, controllers.DeleteSchedule)

	r.POST("api/users/signup", controllers.CreateUser)
	r.POST("api/users/login", controllers.LogInUser)
	r.POST("api/users/logout", controllers.LogoutUser)

	r.Run()
}
