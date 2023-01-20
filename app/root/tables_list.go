package root

import (
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
)

func (a *App) GetAllTables() ([]models.Table, error) {
	return a.services.TablesList.GetAll()
}

func (a *App) CreateTable(table models.Table) error {
	return a.services.TablesList.Create(table)
}

func (a *App) DeleteTable(id uuid.UUID, table string) error {
	return a.services.TablesList.Delete(id, table)
}
