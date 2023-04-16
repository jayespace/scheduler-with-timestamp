package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jayespace/scheduler-with-timestamp/initializers"
	"github.com/jayespace/scheduler-with-timestamp/models"
)

func CreateSchedule(c *gin.Context) {
	// Get login user info
	user, _ := c.Get("user")
	userId := user.(models.User).ID

	var checkSchedule models.Schedule
	lastEntry := initializers.DB.Where("user_id = ?", userId).Last(&checkSchedule)
	checkStatus := checkSchedule.Done

	if lastEntry.Error == nil && !checkStatus {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Schedule must be ended before start ",
		})
		return
	}

	dateNow := time.Now().Format("2006-01-02")

	schedule := models.Schedule{DateLocal: dateNow, UserID: userId}
	result := initializers.DB.Create(&schedule)

	if result.Error != nil {
		c.Status(400)
		return
	}
	// Return it
	c.JSON(200, gin.H{
		"date":   dateNow,
		"status": "success",
	})
}

func GetSchedules(c *gin.Context) {
	// Get login user info
	user, _ := c.Get("user")
	userId := user.(models.User).ID

	// Find username
	var users models.User
	initializers.DB.Where("id = ?", userId).Find(&users)
	username := users.Username

	// Find Current date and check if there is requested date in query
	dateNow := time.Now().Format("2006-01-02")
	dateRequested := c.DefaultQuery("date", "")

	if dateRequested == "" {
		dateRequested = dateNow
	}

	// Find user data matches the requested date
	var schedules []models.Schedule
	initializers.DB.Where("date_local = ? AND user_id = ?", dateRequested, userId).Order("created_at asc").Find(&schedules)

	// Format return data
	type ScheduleResponse struct {
		ID            uint
		Date          string
		CreatedTime   string
		EndedTime     string
		DurationInMin int
		Description   string
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
			Date:          s.DateLocal,
			CreatedTime:   createdTime,
			EndedTime:     endedTime,
			DurationInMin: s.DurationInMin,
			Description:   s.Description,
		})
	}

	initializers.DB.Select("date_local").Where("user_id = ?", userId).Order("created_at asc").Find(&schedules)

	dateMap := make(map[string]bool)
	for _, schedule := range schedules {
		dateMap[schedule.DateLocal] = true
	}

	var dates []string
	for date := range dateMap {
		dates = append(dates, date)
	}

	if _, ok := dateMap[dateNow]; !ok {
		dates = append(dates, dateNow)
	}

	// Respond with them
	c.JSON(200, gin.H{
		"username":  username,
		"dateList":  dates,
		"schedules": response,
	})
}

func UpdateDescription(c *gin.Context) {
	// Get login user info
	user, _ := c.Get("user")
	userId := user.(models.User).ID

	// Get id off url
	id := c.Param("id")

	// Get the data off req body
	var body struct {
		Description string
	}

	c.Bind(&body)

	// Get the posts
	var schedule models.Schedule
	error := initializers.DB.Where("user_id = ?", userId).First(&schedule, id).Error

	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "schedule not found",
		})
		return
	}

	// Update it
	initializers.DB.Model(&schedule).Updates(models.Schedule{Description: body.Description})
	dateChosen := schedule.DateLocal

	// Respond with it
	c.JSON(200, gin.H{
		"date": dateChosen,
		// "status": "sucess",
	})
}

func UpdateEndTime(c *gin.Context) {
	// Get login user info
	user, _ := c.Get("user")
	userId := user.(models.User).ID

	var schedule models.Schedule
	lastEntry := initializers.DB.Where("user_id = ?", userId).Last(&schedule)
	fmt.Println("error is", lastEntry.Error)

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
	dateNow := timeNow.Format("2006-01-02")

	// Find start time from db
	createdAt := schedule.CreatedAt

	// Calculate duration in minutes
	duration := timeNow.Sub(createdAt)
	durationInMin := int(duration.Minutes())

	// Update it
	initializers.DB.Model(&schedule).Updates(models.Schedule{EndedAt: timeNow, Done: true, DurationInMin: durationInMin})

	// Respond with it
	c.JSON(200, gin.H{
		"date": dateNow,
		// "schedule": schedule,
	})
}

func DeleteSchedule(c *gin.Context) {
	// Get login user info
	user, _ := c.Get("user")
	userId := user.(models.User).ID

	// Get the id off the url
	id := c.Param("id")

	// Get the posts
	var schedule models.Schedule
	error := initializers.DB.Where("user_id = ?", userId).First(&schedule, id).Error

	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "schedule not found",
		})
		return
	}

	// Delete
	initializers.DB.Delete(&models.Schedule{}, id)
	dateChosen := schedule.DateLocal

	// Respond with it
	c.JSON(200, gin.H{
		"date": dateChosen,
	})
}
