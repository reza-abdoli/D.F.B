package main

import (
	"fmt"
	"log"
	"net/http"
)

type Task struct {
	Title string
	Done  bool
}

type TaskPageData struct {
	PageTitle string
	Tasks     []Task
}

func main() {

	mux := http.NewServeMux()
	//mux2 := http.NewServeMux()
	fs := http.FileServer(http.Dir("../frontend/dist"))
	//fss := http.FileServer(http.Dir("../frontend/img"))
	mux.Handle("/", fs) //--------------------------------------------------for showing static files in diffrent urls
	//mux2.Handle("/",fss)
	mux.HandleFunc("/j", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "../frontend/dist/index.html") // for doing smth in diffrent urls (its natural we dont need static files for this application(user request and sends is name))
		
	})
	log.Print("Server is listening on port 3030...")

	err := http.ListenAndServe("localhost:3032", mux)
	if err != nil {
		fmt.Println(err)
	}
}
