package models

// ? возможно стоит заменить тип id на string
type Table struct {
	Id      string  `db:"id" json:"id"`
	Title   string  `db:"title" json:"title"`
	TitleDb string  `db:"title_db" json:"titleDb"`
	Alias   string  `db:"alias" json:"alias"`
	Color   string  `db:"color" json:"color"`
	Fields  []Field `json:"fields"`
}
