package main

import (
	"os"

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

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{os.Getenv("CLIENT_URL")}
	config.AllowCredentials = true
	r.Use(cors.Default())

	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{os.Getenv("CLIENT_URL")},
	// 	AllowMethods:     []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"},
	// 	AllowHeaders:     []string{"content-Type", "Authorization"},
	// 	AllowCredentials: true,
	// }))

	r.POST("api/schedules", middlewares.RequiredAuth, controllers.CreateSchedule)
	r.GET("api/schedules", middlewares.RequiredAuth, controllers.GetSchedules)
	r.PATCH("api/schedules", middlewares.RequiredAuth, controllers.UpdateEndTime)
	r.PATCH("api/schedules/:id", middlewares.RequiredAuth, controllers.UpdateDescription)
	r.DELETE("api/schedules/:id", middlewares.RequiredAuth, controllers.DeleteSchedule)

	r.POST("api/users/signup", controllers.CreateUser)
	r.POST("api/users/login", controllers.LogInUser)
	r.POST("api/users/logout", middlewares.RequiredAuth, controllers.LogoutUser)

	r.Run()
}
