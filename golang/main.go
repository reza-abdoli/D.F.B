package main

import (
	//"encoding/json"
	//"fmt"
	//"io/ioutil"

	//"log"
	///"net/http"
	//"strconv"

	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type requestData struct {
	Data string `json:"data"`
}

// func run(port string)  {
	
// 	mux := http.NewServeMux()
// 	fs := http.FileServer(http.Dir("../frontend/dist"))
// 	mux.Handle("/", fs)                                          
// 	mux.Handle("/img/", http.FileServer(http.Dir("../frontend")))

// 	mux.HandleFunc("/go/sha256", func(w http.ResponseWriter, r *http.Request) {
// 		fmt.Println(r.URL)
// 		switch r.Method {
// 		case "POST":
// 			b, err := ioutil.ReadAll(r.Body)
// 			err = json.Unmarshal(b, &requestData)
// 			if err != nil {
// 				http.Error(w, err.Error(), http.StatusUnprocessableEntity)
// 				return
// 			}

// 			first, err := strconv.Atoi(requestData.Data)
// 			if err != nil {
// 				http.Error(w, err.Error(), http.StatusUnprocessableEntity)
// 				return
// 			}
// 			fmt.Println(first)
// 		}

// 	})
	
// 	fmt.Print("Server is listening on port",port," ...\n")

// 	err := http.ListenAndServe(port, mux)
// 	if err != nil {
// 		fmt.Println(err)
// 	}

// }

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		//c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		c.Next()
	}
}

func main() {
	//run(":3060");
	r := gin.Default()
	r.Use(CORSMiddleware())
	r.POST("/go/sha256", func(c *gin.Context) {
		body := requestData{}
	// using BindJson method to serialize body with struct
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	fmt.Println("\n\n",body.Data,"\n\n")
	if len(body.Data) < 8 {
		val := "length is less than 8 characters"
		c.JSON(400, gin.H{
			"string": val,
		})
		return
	}
	})
	r.Run(":3060")
}
