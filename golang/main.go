package main

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/redis/go-redis/v9"
	"github.com/rs/cors"
)

type responseData struct {
	Data    string `json:"data"`
	Message string `json:"message"`
}

func goPost(w http.ResponseWriter, r *http.Request, client *redis.Client) {
	b, err := io.ReadAll(r.Body) 
			if err == io.EOF {
				http.Error(w, err.Error(), http.StatusUnprocessableEntity)
				return
			}
			var d responseData
			err = json.Unmarshal([]byte(b), &d)
			if err != nil {
				http.Error(w, err.Error(), http.StatusUnprocessableEntity)
				return
			}
			var result responseData = responseData{Data: "Less than 8 chars", Message: "Error"} //-------------
			if len(d.Data) > 8 {
				cryptoSha256 := sha256.New()
				cryptoSha256.Write([]byte(d.Data))
				cr := cryptoSha256.Sum(nil)
				result = responseData{Data: hex.EncodeToString(cr), Message: "Your sha256:"} //-------------using string(cr) did not work
				ctx := context.Background()
				err := client.Set(ctx, result.Data, d.Data, 0).Err()
				if err != nil {
					panic(err)
				}
			}
			jsonData, err := json.Marshal(result)
			if err != nil {
				http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
				return
			}
			log.Printf("%+v\n", result)
			w.Write(jsonData)
}

func goGet(w http.ResponseWriter, r *http.Request, client *redis.Client) {
	data := r.URL.Query().Get("sha")
			ctx := context.Background()
			data, err := client.Get(ctx, data).Result()
			result := responseData{Message: "Error", Data: "The sha does not exist"}
			if err == nil {
				result = responseData{Message: "Data:", Data: data}
			}
			jsonData, err := json.Marshal(result)
			if err != nil {
				http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
				return
			}
			log.Printf("%+v\n", result)
			w.Header().Set("Content-Type", "application/json")

			w.Write(jsonData)
}

func goHandler(client *redis.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "POST":
			goPost(w,r,client);
		case "GET":
			goGet(w,r,client);
		default:
			;
		}

	}
}

func run(domain string, port int) {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", 
		DB:       0,  
	})

	mux := http.NewServeMux()
	handler := http.FileServer(http.Dir("../frontend/dist"))
	mux.Handle("/", handler)
//	mux.Handle("/img/", http.FileServer(http.Dir("../frontend")))

	mux.HandleFunc("/go/sha256", goHandler(client))

	fmt.Printf("Server is listening on %s:%d\n", domain, port)

	handler = cors.Default().Handler(mux)
	err := http.ListenAndServe(fmt.Sprintf("%s:%d", domain, port), handler)
	if err != nil {
		fmt.Println(err)
	}

}

func main() {
	run("localhost", 3061)
}
