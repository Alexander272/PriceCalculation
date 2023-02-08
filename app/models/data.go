package models

type Data struct {
	TableName string      `json:"title"`
	Data      []DataValue `json:"data"`
}

type DataValue struct {
	Id    string      `json:"id"`
	Title string      `json:"title"`
	Value interface{} `json:"value"`
}

type DataLine struct {
	Id        string `json:"id"`
	IsChanged bool   `json:"isChanged"`
	IsNew     bool   `json:"isNew"`
	// IsLast    *bool       `json:"isLast"`
	Data []DataValue `json:"data"`
}

type NewData struct {
	TableName string     `json:"title"`
	Lines     []DataLine `json:"lines"`
}
