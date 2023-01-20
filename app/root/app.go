package root

import (
	"context"
	"log"

	"github.com/Alexander272/price_calculation/internal/configs"
	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/internal/services"
	"github.com/Alexander272/price_calculation/models"
	"github.com/Alexander272/price_calculation/pkg/database/postgres"
	_ "github.com/lib/pq"
)

// App struct
type App struct {
	ctx      context.Context
	Config   configs.Config
	services *services.Services
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		Config: *configs.Init(),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx

	db, err := postgres.NewPostgresDB(postgres.Config{
		Host:     a.Config.Postgres.Host,
		Port:     a.Config.Postgres.Port,
		Username: a.Config.Postgres.Username,
		Password: a.Config.Postgres.Password,
		DBName:   a.Config.Postgres.DbName,
		SSLMode:  a.Config.Postgres.SSLMode,
	})
	if err != nil {
		log.Fatalf("failed to initialize db: %s", err.Error())
	}

	repo := repo.NewRepo(db)
	a.services = services.NewService(repo)
}

func (a *App) Shutdown(ctx context.Context) {
}

// Greet returns a greeting for the given name
func (a *App) Calculate(req models.CalculateRequest) (float64, error) {
	return a.services.Calculation.Calculate(req)
}
