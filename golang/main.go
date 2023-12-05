package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
)

var requestData struct {
	Data string `json:"data"`
}

func main() {

	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("../frontend/dist"))
	//fss := http.FileServer(http.Dir("../frontend"))
	//mux.Handle("/vv/",fss)
	//mux.Handle("/vv/c/",fss)//browser khodesh automat az posht sahne be in url request mizane ! chon to include file index.html in masir hast
	mux.Handle("/", fs)                                           //--------------------------------------------------for showing static files in diffrent urls
	mux.Handle("/img/", http.FileServer(http.Dir("../frontend"))) // dar edame url ghabli

	mux.HandleFunc("/go/sha256", func(w http.ResponseWriter, r *http.Request) {
		// for doing smth in diffrent urls (its natural we dont need static files for this application(user request and sends is name))
		switch r.Method {
		case "POST":
			b, err := ioutil.ReadAll(r.Body)
			err = json.Unmarshal(b, &requestData)
			if err != nil {
				http.Error(w, err.Error(), http.StatusUnprocessableEntity)
				return
			}

			first, err := strconv.Atoi(requestData.Data)
			if err != nil {
				http.Error(w, err.Error(), http.StatusUnprocessableEntity)
				return
			}
			fmt.Println(first)
		}

	})
	// amalan ma hamishe file html ro toye handle miarim (age esmesh "index.html" bod nmikhad khod browser tashkhis mide.) . va khod file html bekhater link ha va script ha be file haye css ba js(static file ha) vabaste hast va onaro ham to request miare ke bayad ba handle haye dige masir onaro ham moshakhas knim
	log.Print("Server is listening on port 3030...")

	err := http.ListenAndServe("localhost:3060", mux)
	if err != nil {
		fmt.Println(err)
	}

}
