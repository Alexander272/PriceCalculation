package repo

import (
	"github.com/Alexander272/price_calculation/internal/repo/postgres"
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type TablesList interface {
	GetAll() ([]models.Table, error)
	Create(models.Table, uuid.UUID) error
	Delete(string, string) error
}

type Field interface {
	Create(models.Field, string) error
	CreateSeveral([]models.Field, uuid.UUID) error
	Update(models.Field) error
	Delete(id string, tableName, columnName string) error
}

type Common interface {
	GetAll(table models.Table) (data [][]interface{}, err error)
	GetAllNew(table models.Table) (list []models.DataLine, err error)
	Create(line models.Data) error
	Update(line models.Data) error
	Delete(tableName string, id string) error
}

type Repo struct {
	TablesList
	Field
	Common
}

func NewRepo(db *sqlx.DB) *Repo {
	return &Repo{
		TablesList: postgres.NewTableListRepo(db),
		Field:      postgres.NewFieldRepo(db),
		Common:     postgres.NewCommonRepo(db),
	}
}
