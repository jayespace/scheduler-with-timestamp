package initializers

import "github.com/jayespace/scheduler-with-timestamp/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.Schedule{})
	DB.AutoMigrate(&models.User{})
}
