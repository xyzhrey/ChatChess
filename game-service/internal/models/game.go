package models

type Game struct {

	ID int `json:"id"`

	RoomID string `json:"room_id"`

	FEN string `json:"fen"`

	Moves string `json:"moves"`

	Winner string `json:"winner"`
}
