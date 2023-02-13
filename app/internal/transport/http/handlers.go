package http

import (
	"net/http"

	"github.com/Alexander272/price_calculation/internal/configs"
	"github.com/Alexander272/price_calculation/internal/services"
	httpV1 "github.com/Alexander272/price_calculation/internal/transport/http/v1"
	"github.com/Alexander272/price_calculation/pkg/limiter"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *services.Services
}

func NewHandler(services *services.Services) *Handler {
	return &Handler{services: services}
}

func (h *Handler) Init(conf *configs.Config) *gin.Engine {
	router := gin.Default()

	router.Use(
		limiter.Limit(conf.Limiter.RPS, conf.Limiter.Burst, conf.Limiter.TTL),
	)

	// Init router
	router.GET("/api/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	h.initAPI(router, conf.Auth)

	return router
}

func (h *Handler) initAPI(router *gin.Engine, auth *configs.AuthConfig) {
	// , middleware.NewMiddleware(h.services, auth)
	handlerV1 := httpV1.NewHandler(h.services, auth)
	api := router.Group("/api")
	{
		handlerV1.Init(api)
	}
}
