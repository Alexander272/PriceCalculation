package main

import (
	"context"

	"github.com/Alexander272/price_calculation/internal/configs"
	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/internal/services"
	"github.com/Alexander272/price_calculation/models"
	"github.com/jmoiron/sqlx"
)

// App struct
type App struct {
	ctx      context.Context
	config   configs.Config
	services *services.Services
}

// NewApp creates a new App application struct
func NewApp() *App {
	repo := repo.NewRepo(&sqlx.DB{})

	return &App{
		config:   *configs.Init(),
		services: services.NewService(repo),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

}

func (a *App) shutdown(ctx context.Context) {
}

// Greet returns a greeting for the given name
func (a *App) Calculate(req models.CalculateRequest) (float64, error) {
	return a.services.Calculation.Calculate(req)
}
