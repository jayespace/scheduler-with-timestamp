package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
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
			"error": "다른 아이디로 가입해주세요",
		})

		return
	}

	// Respond
	c.JSON(200, gin.H{
		"status": "Success",
	})
}

func LogInUser(c *gin.Context) {
	// Get the email and pass off req body
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

	// Look up requested user
	var user models.User
	initializers.DB.First(&user, "username = ?", body.Username)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "가입되어 있지 않은 사용자입니다",
		})

		return
	}

	// Compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "비밀번호를 확인해 주세요",
		})

		return
	}

	// Generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})

		return
	}

	// Set up the cookie and send it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 86400, "/", "", false, true)

	c.JSON(200, gin.H{
		"status": "Log In Success",
	})
}

func LogoutUser(c *gin.Context) {
	_, err := c.Cookie("Authorization")

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Fail",
		})
		return
	}

	// Remove the cookie by setting the value to an empty string and the expiration time to a past time
	c.SetCookie("Authorization", "", -1, "/", "", false, true)

	c.JSON(200, gin.H{
		"status": "Log out Sucess",
	})
}
