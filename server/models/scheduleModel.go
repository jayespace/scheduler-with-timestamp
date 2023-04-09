package models

import "time"

type Schedule struct {
	ID            uint `gorm:"primaryKey"`
	Date          string
	CreatedAt     time.Time
	EndedAt       time.Time
	DurationInMin int
	Description   string
	Done          bool `default:"false"`
}
