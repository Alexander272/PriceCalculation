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

type Field struct {
	Id          string `db:"id" json:"id"`
	TableId     string `db:"table_id" json:"tableId"`
	Title       string `db:"title" json:"title"`
	Name        string `db:"name" json:"name"`
	TypeDb      string `db:"type_db" json:"typeDb"`
	TypeApp     string `db:"type_app" json:"typeApp"`
	Number      string `db:"number" json:"number"`
	IsForSearch bool   `db:"is_for_search" json:"isForSearch"`
	Formula     string `db:"formula" json:"formula"`
	IsNotNull   bool   `db:"is_not_null" json:"isNotNull"`
	Default     string `db:"default" json:"default"`
}
