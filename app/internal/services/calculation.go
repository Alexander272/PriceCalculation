package services

import (
	"fmt"
	"log"

	"github.com/Alexander272/price_calculation/models"
	"github.com/Alexander272/price_calculation/pkg/logger"
	"github.com/Pramod-Devireddy/go-exprtk"
)

type CalculationService struct {
	params *ParamsService
}

func NewCalculationService(params *ParamsService) *CalculationService {
	return &CalculationService{
		params: params,
	}
}

func (s *CalculationService) Calculate(req models.CalculateRequest) (float64, error) {
	params, err := s.params.GetParams(models.GetParams{})
	if err != nil {
		return 0, err
	}

	exprtkObj := exprtk.NewExprtk()
	defer exprtkObj.Delete()

	exprtkObj.SetExpression(req.Formula)
	logger.Debug(req.Formula)
	log.Println(req.Formula)

	for _, p := range params {
		exprtkObj.AddDoubleVariable(p.Name)
	}
	// exprtkObj.AddDoubleVariable("x")

	err = exprtkObj.CompileExpression()
	if err != nil {
		logger.Errorf("failed to compile expression. error: %w", err)
		return 0, fmt.Errorf("failed to compile expression. error: %w", err)
	}

	// exprtkObj.SetDoubleVariableValue("x", 18)
	for _, p := range params {
		exprtkObj.SetDoubleVariableValue(p.Name, p.Value)
	}

	result := exprtkObj.GetEvaluatedValue()

	return result, nil
}
