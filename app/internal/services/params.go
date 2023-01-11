package services

import "github.com/Alexander272/price_calculation/models"

type ParamsService struct{}

func NewParamsService() *ParamsService {
	return &ParamsService{}
}

func (s *ParamsService) GetParams(req models.GetParams) ([]models.Params, error) {
	params := []models.Params{}

	params = append(params, models.Params{
		Id:    "",
		Name:  "A",
		Value: 10,
	})
	params = append(params, models.Params{
		Id:    "",
		Name:  "B",
		Value: 2,
	})
	params = append(params, models.Params{
		Id:    "",
		Name:  "C",
		Value: 6,
	})
	params = append(params, models.Params{
		Id:    "",
		Name:  "D",
		Value: 14,
	})

	return params, nil
}
