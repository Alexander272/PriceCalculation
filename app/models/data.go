package models

import "github.com/google/uuid"

type Data struct {
	TableName string      `json:"title"`
	Data      []DataValue `json:"data"`
}

type DataValue struct {
	Id    uuid.UUID   `json:"id"`
	Title string      `json:"title"`
	Value interface{} `json:"value"`
}
