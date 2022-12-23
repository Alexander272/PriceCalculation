package main

import (
	"time"

	"github.com/Alexander272/price-calculation/pkg/logger"
	"github.com/Knetic/govaluate"
)

func main() {
	start := time.Now()

	expression, err := govaluate.NewEvaluableExpression("(x + 2) / (10 * xx) + (2**4)")
	if err != nil {
		logger.Fatalf("failed to parse expression. error: %w", err)
	}

	parameters := make(map[string]interface{}, 8)
	parameters["x"] = 48
	parameters["xx"] = 2

	result, err := expression.Evaluate(parameters)
	if err != nil {
		logger.Fatalf("failed to evaluate expression. error: %w", err)
	}
	logger.Info(result)

	end := time.Since(start)
	logger.Info(end)
}
