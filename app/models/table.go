package models

import "github.com/google/uuid"

type Table struct {
	Id     uuid.UUID `db:"id" json:"id"`
	Title  string    `db:"title" json:"title"`
	Alias  string    `db:"alias" json:"alias"`
	Color  string    `db:"color"`
	Fields []Field
}

type Field struct {
	Id          uuid.UUID `db:"id"`
	TableId     uuid.UUID `db:"table_id"`
	Title       string    `db:"title"`
	TypeDb      string    `db:"type_db"`
	TypeApp     string    `db:"type_app"`
	Number      string    `db:"number"`
	IsForSearch bool      `db:"is_for_search"`
	Formula     string    `db:"formula"`
	IsNotNull   bool      `db:"is_not_null"`
	Default     string    `db:"default"`
}
