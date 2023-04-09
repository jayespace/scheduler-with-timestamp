package models

import "time"

type Schedule struct {
	ID            uint `gorm:"primaryKey"`
	DateLocal     string
	CreatedAt     time.Time
	EndedAt       time.Time
	DurationInMin int
	Description   string
	Done          bool `default:"false"`
	UserID        uint `gorm:"ForeignKey:ID"`
	// User          User `gorm:"foreignKey:UserID"`
}
