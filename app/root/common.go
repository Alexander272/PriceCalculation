package root

import (
	"github.com/Alexander272/price_calculation/models"
)

func (a *App) GetAllTableData(table models.Table) ([][]interface{}, error) {
	return a.services.Common.GetAll(table)
}

func (a *App) GetAllTableDataNew(table models.Table) ([]models.DataLine, error) {
	return a.services.Common.GetAllNew(table)
}

func (a *App) CreateTableData(line models.Data) error {
	return a.services.Common.Create(line)
}

func (a *App) CreateTableDataSeveral(table models.NewData) error {
	return a.services.Common.CreateSeveral(table)
}

func (a *App) UpdateTableData(line models.Data) error {
	return a.services.Common.Update(line)
}

func (a *App) DeleteTableData(tableName string, id string) error {
	return a.services.Common.Delete(tableName, id)
}
