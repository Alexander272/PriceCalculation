package services

import (
	"time"

	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
	"github.com/Alexander272/price_calculation/pkg/auth"
	"github.com/Alexander272/price_calculation/pkg/hasher"
	"github.com/google/uuid"
)

type TablesList interface {
	GetAll() ([]models.Table, error)
	Create(table models.Table) error
	Delete(id string, table string) error
}

type Fields interface {
	Create(field models.Field, tableName string) error
	CreateSeveral(fields []models.Field, tableId uuid.UUID) error
	Delete(id string, tableName, columnName string) error
}

type Common interface {
	GetAll(table models.Table) ([][]interface{}, error)
	GetAllNew(table models.Table) ([]models.DataLine, error)
	Create(line models.Data) error
	CreateSeveral(models.NewData) error
	Update(line models.Data) error
	Delete(tableName string, id string) error
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

type Deps struct {
	Repos           *repo.Repo
	TokenManager    auth.TokenManager
	Hasher          hasher.PasswordHasher
	AccessTokenTTL  time.Duration
	RefreshTokenTTL time.Duration
}

func NewServices(deps Deps) *Services {
	fields := NewFieldsService(deps.Repos.Field)
	tableList := NewTablesListService(deps.Repos.TablesList, fields)
	common := NewCommonService(deps.Repos.Common)
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
