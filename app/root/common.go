package root

import (
	"github.com/Alexander272/price_calculation/models"
)

func (a *App) GetAllData(table models.Table) ([]interface{}, error) {
	return a.services.Common.GetAll(table)
}

func (a *App) CreateData(line models.Data) error {
	return a.services.Common.Create(line)
}

func (a *App) UpdateData(line models.Data) error {
	return a.services.Common.Update(line)
}

func (a *App) Delete(tableName string, id string) error {
	return a.services.Common.Delete(tableName, id)
}
