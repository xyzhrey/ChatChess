package main

import (
	"fmt"
	"log"
	"net/http"

	"game-service/internal/database"
)

func main() {

	db, err :=
		database.Connect()

	if err != nil {

		log.Fatal(err)
	}

	err = db.Ping()

	if err != nil {

		log.Fatal(err)
	}

	fmt.Println(
		"Connected to PostgreSQL",
	)

	http.HandleFunc(
		"/health",
		func(
			w http.ResponseWriter,
			r *http.Request,
		) {

			fmt.Fprintln(
				w,
				"OK",
			)
		},
	)

	log.Println(
		"Server running on :8080",
	)

	log.Fatal(
		http.ListenAndServe(
			":8080",
			nil,
		),
	)
}
