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
	fss := http.FileServer(http.Dir("../frontend"))
	mux.Handle("/vv/",fss)
	mux.Handle("/vv/c/",fss)//browser khodesh automat az posht sahne be in url request mizane ! chon to include file index.html in masir hast
	mux.Handle("/", fs) //--------------------------------------------------for showing static files in diffrent urls
	mux.Handle("/img/" , http.FileServer(http.Dir("../frontend"))) // dar edame url ghabli
	//mux2.Handle("/",fss)
	//mux.HandleFunc("/j", func(w http.ResponseWriter, r *http.Request) {
	//	http.ServeFile(w, r, "../frontend/dist/index.html") // for doing smth in diffrent urls (its natural we dont need static files for this application(user request and sends is name))
		
//	})
// amalan ma hamishe file html ro toye handle miarim (age esmesh "index.html" bod nmikhad khod browser tashkhis mide.) . va khod file html bekhater link ha va script ha be file haye css ba js(static file ha) vabaste hast va onaro ham to request miare ke bayad ba handle haye dige masir onaro ham moshakhas knim
	log.Print("Server is listening on port 3030...")

	err := http.ListenAndServe("localhost:3100", mux)
	if err != nil {
		fmt.Println(err)
	}
}
