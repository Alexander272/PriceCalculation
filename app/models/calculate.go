package models

type CalculateRequest struct {
	Formula string   `json:"formula"`
	Params  []Params `json:"params"`
}
