package handler

import (
	"github.com/jayespace/scheduler-with-timestamp/initializers"
	"github.com/jayespace/scheduler-with-timestamp/models"
)

type ScheduleResponse struct {
	ID            uint
	Date          string
	CreatedTime   string
	EndedTime     string
	DurationInMin int
	Description   string
	Done          bool
}

func FormatResult(userId uint, date string) []ScheduleResponse {

	// Find user data matches the requested date
	var schedules []models.Schedule
	initializers.DB.Where("date_local = ? AND user_id = ?", date, userId).Order("created_at asc").Find(&schedules)

	// Format the return data

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

	return response
}
