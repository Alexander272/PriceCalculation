package models

type Data struct {
	TableName string
	Data      []DataValue
}

type DataValue struct {
	Title string
	Value interface{}
}
