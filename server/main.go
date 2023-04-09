package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jayespace/scheduler-with-timestamp/controllers"
	"github.com/jayespace/scheduler-with-timestamp/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()

	r.POST("/schedules", controllers.CreateSchedule)
	r.GET("/schedules", controllers.FindAllSchedule)
	r.PATCH("/schedules", controllers.UpdateEndTime)
	r.PATCH("/schedules/:id", controllers.UpdateDescription)
	r.DELETE("/schedules/:id", controllers.DeleteSchedule)

	r.Run()
}
