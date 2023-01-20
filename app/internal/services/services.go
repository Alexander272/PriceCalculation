package services

import (
	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
)

type TablesList interface {
	GetAll() ([]models.Table, error)
	Create(table models.Table) error
	Delete(id uuid.UUID, table string) error
}

type Fields interface {
	Create(field models.Field, tableName string) error
	CreateSeveral(fields []models.Field) error
	Delete(id uuid.UUID, tableName, columnName string) error
}

type Common interface {
	GetAll(table models.Table) ([]interface{}, error)
	Create(line models.Data) error
	Update(line models.Data) error
	Delete(tableName string, id uuid.UUID) error
}

type Calculation interface {
	Calculate(models.CalculateRequest) (float64, error)
}

type Params interface {
	GetParams(models.GetParams) ([]models.Params, error)
}

type Services struct {
	TablesList
	Fields
	Common
	Calculation
	Params
}

func NewService(repo *repo.Repo) *Services {
	fields := NewFieldsService(repo.Field)
	tableList := NewTablesListService(repo.TablesList, fields)
	common := NewCommonService(repo.Common)
	params := NewParamsService()
	calculation := NewCalculationService(params)

	return &Services{
		TablesList:  tableList,
		Fields:      fields,
		Common:      common,
		Params:      params,
		Calculation: calculation,
	}
}
