package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/Alexander272/price_calculation/internal/configs"
	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/internal/server"
	"github.com/Alexander272/price_calculation/internal/services"
	transport "github.com/Alexander272/price_calculation/internal/transport/http"
	"github.com/Alexander272/price_calculation/pkg/auth"
	"github.com/Alexander272/price_calculation/pkg/database/postgres"
	"github.com/Alexander272/price_calculation/pkg/database/redis"
	"github.com/Alexander272/price_calculation/pkg/hasher"
	"github.com/Alexander272/price_calculation/pkg/logger"
	_ "github.com/lib/pq"
	"github.com/subosito/gotenv"
)

func main() {
	if err := gotenv.Load("../.env"); err != nil {
		logger.Fatalf("error loading env variables: %s", err.Error())
	}

	conf, err := configs.Init("config")
	if err != nil {
		logger.Fatalf("error initializing configs: %s", err.Error())
	}
	logger.Init(os.Stdout, conf.Environment)

	//* Dependencies
	db, err := postgres.NewPostgresDB(postgres.Config{
		Host:     conf.Postgres.Host,
		Port:     conf.Postgres.Port,
		Username: conf.Postgres.Username,
		Password: conf.Postgres.Password,
		DBName:   conf.Postgres.DbName,
		SSLMode:  conf.Postgres.SSLMode,
	})
	if err != nil {
		logger.Fatalf("failed to initialize db: %s", err.Error())
	}

	redis, err := redis.NewRedisClient(redis.Config{
		Host:     conf.Redis.Host,
		Port:     conf.Redis.Port,
		DB:       conf.Redis.DB,
		Password: conf.Redis.Password,
	})
	if err != nil {
		logger.Fatalf("failed to initialize redis %s", err.Error())
	}

	tokenManager, err := auth.NewManager(conf.Auth.Key)
	if err != nil {
		logger.Fatalf("failed to initialize token manager: %s", err.Error())
	}

	hasher := hasher.NewSHA256Hasher(10)

	//* Services, Repos & API Handlers

	repos := repo.NewRepo(db, redis)
	services := services.NewServices(services.Deps{
		Repos:           repos,
		TokenManager:    tokenManager,
		Hasher:          hasher,
		AccessTokenTTL:  conf.Auth.AccessTokenTTL,
		RefreshTokenTTL: conf.Auth.RefreshTokenTTL,
	})
	handlers := transport.NewHandler(services)

	//* HTTP Server

	srv := server.NewServer(conf, handlers.Init(conf))
	go func() {
		if err := srv.Run(); !errors.Is(err, http.ErrServerClosed) {
			logger.Fatalf("error occurred while running http server: %s\n", err.Error())
		}
	}()
	logger.Infof("Application started on port: %s", conf.Http.Port)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)

	<-quit

	const timeout = 5 * time.Second

	ctx, shutdown := context.WithTimeout(context.Background(), timeout)
	defer shutdown()

	if err := srv.Stop(ctx); err != nil {
		logger.Errorf("failed to stop server: %v", err)
	}
}