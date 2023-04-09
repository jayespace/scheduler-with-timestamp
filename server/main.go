package main

import (
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

	r.POST("/schedules", middlewares.RequiredAuth, controllers.CreateSchedule)
	r.GET("/schedules", middlewares.RequiredAuth, controllers.FindSchedules)
	r.PATCH("/schedules", middlewares.RequiredAuth, controllers.UpdateEndTime)
	r.PATCH("/schedules/:id", middlewares.RequiredAuth, controllers.UpdateDescription)
	r.DELETE("/schedules/:id", middlewares.RequiredAuth, controllers.DeleteSchedule)

	r.POST("/signup", controllers.CreateUser)
	r.POST("/login", controllers.LogInUser)

	r.Run()
}
