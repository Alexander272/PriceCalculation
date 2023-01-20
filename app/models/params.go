package models

type GetParams struct {
}

type Params struct {
	Id    string  `json:"id"`
	Name  string  `json:"name"`
	Value float64 `json:"value"`
}
