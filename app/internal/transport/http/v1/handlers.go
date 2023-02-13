package v1

import (
	"github.com/Alexander272/price_calculation/internal/configs"
	"github.com/Alexander272/price_calculation/internal/services"
	"github.com/gin-gonic/gin"
)

const CookieName = "session"

type Handler struct {
	services   *services.Services
	auth       *configs.AuthConfig
	cookieName string
	// middleware *middleware.Middleware
}

func NewHandler(services *services.Services, auth *configs.AuthConfig) *Handler {
	// middleware.CookieName = CookieName

	return &Handler{
		services:   services,
		auth:       auth,
		cookieName: CookieName,
		// middleware: middleware,
	}
}

func (h *Handler) Init(api *gin.RouterGroup) {
	v1 := api.Group("/v1")
	{
		v1.GET("/", h.notImplemented)
	}

	h.InitTablesRoutes(v1)
	h.InitFieldsRoutes(v1)
	h.InitCommonRoutes(v1)
}

func (h *Handler) notImplemented(c *gin.Context) {}
