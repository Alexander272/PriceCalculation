package services

import (
	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
)

type Calculation interface {
	Calculate(models.CalculateRequest) (float64, error)
}

type Params interface {
	GetParams(models.GetParams) ([]models.Params, error)
}

type Services struct {
	Calculation
	Params
}

func NewService(repo *repo.Repo) *Services {
	params := NewParamsService()

	return &Services{
		Calculation: NewCalculationService(params),
		Params:      params,
	}
}
