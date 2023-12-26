package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"

	"crypto/sha256"
	"encoding/hex"
)

type responseData struct {
	Data    string `json:"data"`
	Message string `json:"message"`
}

func goPost(client *redis.Client) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var d responseData
		c.Bind(&d)

		if len(d.Data) > 8 {
			cryptoSha256 := sha256.New()
			cryptoSha256.Write([]byte(d.Data))
			cr := cryptoSha256.Sum(nil)
			result := responseData{Data: hex.EncodeToString(cr), Message: "Your sha256:"}
			ctx := context.Background()
			err := client.Set(ctx, result.Data, d.Data, 0).Err()
			if err != nil {
				panic(err)
			}
			c.JSON(http.StatusOK, result)
			log.Printf("%+v\n", result)
		} else {
			result := responseData{Data: "Less than 8 chars", Message: "Error"}
			c.JSON(http.StatusOK, result)
			log.Printf("%+v\n", result)
		}

	}

	return gin.HandlerFunc(fn)
}

func goGet(client *redis.Client) gin.HandlerFunc {
	fn := func(c *gin.Context) {

		input := c.Query("sha")
		log.Println(input)
		ctx := context.Background()
		data, err := client.Get(ctx, input).Result()

		result := responseData{Message: "Error", Data: "The sha does not exist"}
		if err != nil {
			log.Printf("%+v\n", result)
			c.JSON(200, result)
			return
		}
		result = responseData{Message: "Data:", Data: data}
		log.Printf("%+v\n", result)
		c.JSON(200, result)
	}
	return gin.HandlerFunc(fn)
}

func main() {

	r := gin.Default()
	r.Use(cors.Default())
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})

	r.POST("/go/sha256", goPost(client))
	r.GET("/go/sha256", goGet(client))

	r.Run(":3061")
}
