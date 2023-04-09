package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jayespace/scheduler-with-timestamp/initializers"
	"github.com/jayespace/scheduler-with-timestamp/models"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *gin.Context) {
	// Get the email/pass off req body
	var body struct {
		Username string
		Password string
	}

	// to populate variable and pass the reference to the variable
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return

	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})

		return

	}

	// Create the user
	user := models.User{Username: body.Username, Password: string(hash)}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})

		return

	}

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"status": "success",
	})
}
