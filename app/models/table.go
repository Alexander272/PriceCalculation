package models

import "github.com/google/uuid"

type Table struct {
	Id     uuid.UUID `db:"id" json:"id"`
	Title  string    `db:"title" json:"title"`
	Alias  string    `db:"alias" json:"alias"`
	Color  string    `db:"color" json:"color"`
	Fields []Field   `json:"fields"`
}

type Field struct {
	Id          uuid.UUID `db:"id" json:"id"`
	TableId     uuid.UUID `db:"table_id" json:"titleId"`
	Title       string    `db:"title" json:"title"`
	TypeDb      string    `db:"type_db" json:"typeDb"`
	TypeApp     string    `db:"type_app" json:"typeApp"`
	Number      string    `db:"number" json:"number"`
	IsForSearch bool      `db:"is_for_search" json:"isForSearch"`
	Formula     string    `db:"formula" json:"formula"`
	IsNotNull   bool      `db:"is_not_null" json:"isNotNull"`
	Default     string    `db:"default" json:"default"`
}
