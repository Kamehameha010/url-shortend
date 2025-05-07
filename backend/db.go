package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

func GetConnection(host string, port int, user string, pwd string, dbname string) (*sql.DB, error) {

	if host == "" {
		host = "localhost"
	}

	if dbname == "" {
		dbname = "postgres"
	}

	psqlConnStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, pwd, dbname)

	db, err := sql.Open("postgres", psqlConnStr)

	if err != nil {
		return nil, err
	}
	return db, err

}
