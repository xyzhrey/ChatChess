package database

import (
	"database/sql"

	_ "github.com/lib/pq"
)

func Connect() (*sql.DB, error) {

	connStr :=
		"host=localhost " +
			"port=5432 " +
			"user=chessuser " +
			"password=StrongPassword123 " +
			"dbname=chessdb " +
			"sslmode=disable"

	return sql.Open(
		"postgres",
		connStr,
	)
}
