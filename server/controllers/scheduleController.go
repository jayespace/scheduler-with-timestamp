package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jayespace/scheduler-with-timestamp/initializers"
	"github.com/jayespace/scheduler-with-timestamp/models"
)

func CreateSchedule(c *gin.Context) {

	var checkSchedule models.Schedule
	lastEntry := initializers.DB.Last(&checkSchedule)
	checkStatus := checkSchedule.Done

	if lastEntry.Error == nil && !checkStatus {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Schedule must be ended before start ",
		})
		return
	}

	date := time.Now().Format("2006-01-02")

	schedule := models.Schedule{Date: date}
	result := initializers.DB.Create(&schedule)

	if result.Error != nil {
		c.Status(400)
		return
	}
	// Return it
	c.JSON(200, gin.H{
		"status": "success",
	})
}

func FindAllSchedule(c *gin.Context) {
	// Find Current date
	date := time.Now().Format("2006-01-02")

	// Find schedules on the same date and order by created_at field in ascending order
	var schedules []models.Schedule
	initializers.DB.Where("date = ?", date).Order("created_at asc").Find(&schedules)

	// Format the return data
	type ScheduleResponse struct {
		ID            uint
		CreatedTime   string
		EndedTime     string
		DurationInMin int
		Description   string
		Done          bool
	}

	var response []ScheduleResponse

	for _, s := range schedules {
		createdTime := s.CreatedAt.Format("15:04")

		var endedTime string
		if s.Done {
			endedTime = s.EndedAt.Format("15:04")
		}

		response = append(response, ScheduleResponse{
			ID:            s.ID,
			CreatedTime:   createdTime,
			EndedTime:     endedTime,
			DurationInMin: s.DurationInMin,
			Description:   s.Description,
			Done:          s.Done,
		})
	}

	// Respond with them
	c.JSON(200, gin.H{
		"dateNow":   date,
		"schedules": response,
	})
}

func UpdateDescription(c *gin.Context) {
	// Get id off url
	id := c.Param("id")

	// Get the data off req body
	var body struct {
		Description string
	}

	c.Bind(&body)

	// Get the posts
	var schedule models.Schedule
	initializers.DB.First(&schedule, id)

	// Update it
	initializers.DB.Model(&schedule).Updates(models.Schedule{Description: body.Description})

	// Respond with it
	c.JSON(200, gin.H{
		"schedule": schedule,
	})
}

func UpdateEndTime(c *gin.Context) {

	var schedule models.Schedule
	lastEntry := initializers.DB.Last(&schedule)

	if lastEntry.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Start scheduling by clicking start",
		})
		return
	}

	checkStatus := schedule.Done

	if checkStatus {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Create a schedule first",
		})
		return
	}

	// Find current time
	timeNow := time.Now()

	// Find start time from db
	createdAt := schedule.CreatedAt

	// Calculate duration in minutes
	duration := timeNow.Sub(createdAt)
	durationInMin := int(duration.Minutes())

	// Update it
	initializers.DB.Model(&schedule).Updates(models.Schedule{EndedAt: timeNow, Done: true, DurationInMin: durationInMin})

	// Respond with it
	c.JSON(200, gin.H{
		"schedule": schedule,
	})
}

func DeleteSchedule(c *gin.Context) {
	// Get the id off the url
	id := c.Param("id")

	// Get the posts
	var schedule models.Schedule
	error := initializers.DB.First(&schedule, id).Error

	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "schedule not found",
		})
		return
	}

	// Delete
	initializers.DB.Delete(&models.Schedule{}, id)

	// Respond with it
	c.JSON(200, gin.H{
		"status": "Deletion Completed",
	})
}
