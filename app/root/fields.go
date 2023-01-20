package root

import (
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
)

func (a *App) CreateNewField(field models.Field, tableName string) error {
	return a.services.Fields.Create(field, tableName)
}

func (a *App) DeleteField(id uuid.UUID, tableName, columnName string) error {
	return a.services.Fields.Delete(id, tableName, columnName)
}
