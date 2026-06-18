package database

import (
	"database/sql"

	"game-service/internal/models"
)

type GameRepository struct {

	DB *sql.DB
}

func NewGameRepository(
	db *sql.DB,
) *GameRepository {

	return &GameRepository{
		DB: db,
	}
}
