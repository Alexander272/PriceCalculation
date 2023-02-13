package services

import (
	"context"
	"time"

	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
	"github.com/Alexander272/price_calculation/pkg/auth"
	"github.com/Alexander272/price_calculation/pkg/hasher"
	"github.com/google/uuid"
)

type TablesList interface {
	GetAll(context.Context) ([]models.Table, error)
	Create(context.Context, models.Table) error
	Delete(ctx context.Context, id string, table string) error
}

type Fields interface {
	Create(context.Context, models.FieldDTO) error
	CreateSeveral(ctx context.Context, fields []models.Field, tableId uuid.UUID) error
	Delete(context.Context, models.FieldDTO) error
}

type Common interface {
	GetAll(context.Context, models.Table) ([]models.DataLine, error)
	Create(context.Context, models.Data) error
	CreateSeveral(context.Context, models.NewData) error
	Update(context.Context, models.Data) error
	Delete(ctx context.Context, tableName string, id string) error
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
