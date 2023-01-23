package root

import (
	"github.com/Alexander272/price_calculation/models"
)

func (a *App) GetAllTables() ([]models.Table, error) {
	return a.services.TablesList.GetAll()
}

func (a *App) CreateTable(table models.Table) error {
	return a.services.TablesList.Create(table)
}

func (a *App) DeleteTable(id string, table string) error {
	return a.services.TablesList.Delete(id, table)
}
