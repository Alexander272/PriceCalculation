package repo

import (
	"github.com/Alexander272/price_calculation/internal/repo/postgres"
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type Table interface {
	GetAll() ([]models.Table, error)
	Create(models.Table) error
	Delete(uuid.UUID, string) error
}

type Field interface {
	Create(models.Field, string) error
	CreateSeveral([]models.Field) error
	Update(models.Field) error
	Delete(id uuid.UUID, tableName, columnName string) error
}

type Repo struct {
	Table
	Field
}

func NewRepo(db *sqlx.DB) *Repo {
	return &Repo{
		Table: postgres.NewTableRepo(db),
		Field: postgres.NewFieldRepo(db),
	}
}
