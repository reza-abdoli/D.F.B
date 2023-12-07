package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"

	"net/http"
	//"strconv"
)

type requestData struct {
	Data string `json:"data"`
}

func goPost(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		b, err := io.ReadAll(r.Body) // reads byte by byte => [](key:value)
		if err == io.EOF {
			http.Error(w, err.Error(), http.StatusUnprocessableEntity)
			return
		}
		var d requestData
		err = json.Unmarshal([]byte(b), &d)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnprocessableEntity)
			return
		}
		var result requestData = requestData{Data: "Less than 8 chars"} //-------------
		if len(d.Data) > 8  {
			cryptoSha256 := sha256.New()
			cryptoSha256.Write([]byte(d.Data))
			cr := cryptoSha256.Sum(nil)
			result = requestData{Data: hex.EncodeToString(cr)} //-------------using string(cr) did not work
		}
		jsonData, err := json.Marshal(result)
		if err != nil {
			http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
			return
		}
		fmt.Println(result)
		w.Header().Set("Content-Type", "application/json")
	
		w.Write(jsonData)
	}

}  

func run(port string)  {
	
	mux := http.NewServeMux()
	handler := http.FileServer(http.Dir("../frontend/dist"))
	mux.Handle("/", handler)                                          
	mux.Handle("/img/", http.FileServer(http.Dir("../frontend")))

	mux.HandleFunc("/go/sha256", goPost)
	
	fmt.Print("Server is listening on port",port," ...\n")

	err := http.ListenAndServe(port, mux)
	if err != nil {
		fmt.Println(err)
	}

}

func main() {
	run(":3061");
}
