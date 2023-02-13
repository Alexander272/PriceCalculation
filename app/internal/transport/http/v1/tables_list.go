package v1

import (
	"net/http"

	"github.com/Alexander272/price_calculation/internal/services"
	"github.com/Alexander272/price_calculation/models"
	"github.com/Alexander272/price_calculation/models/response"
	"github.com/gin-gonic/gin"
)

type TablesHandler struct {
	services *services.Services
}

func NewTablesHandlers(services *services.Services) *TablesHandler {
	return &TablesHandler{
		services: services,
	}
}

func (h *Handler) InitTablesRoutes(api *gin.RouterGroup) {
	handlers := NewTablesHandlers(h.services)

	tables := api.Group("/tables")
	{
		tables.GET("/all", handlers.GetAll)
		tables.POST("/", handlers.Create)
		tables.DELETE("/:id", handlers.Delete)
	}
}

func (h *TablesHandler) GetAll(c *gin.Context) {
	tables, err := h.services.TablesList.GetAll(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "failed to get tables")
		return
	}

	c.JSON(http.StatusOK, response.DataResponse{Data: tables, Count: len(tables)})
}

func (h *TablesHandler) Create(c *gin.Context) {
	var dto models.Table
	if err := c.BindJSON(&dto); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, err.Error(), "invalid data send")
		return
	}

	if err := h.services.TablesList.Create(c, dto); err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "something went wrong")
		return
	}

	c.JSON(http.StatusCreated, response.IdResponse{Message: "Table created successfully"})
}

func (h *TablesHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		response.NewErrorResponse(c, http.StatusBadRequest, "empty id", "empty id param")
		return
	}

	var dto models.Table
	if err := c.BindJSON(&dto); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, err.Error(), "invalid data send")
		return
	}

	if err := h.services.TablesList.Delete(c, id, dto.TitleDb); err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "something went wrong")
		return
	}

	c.JSON(http.StatusCreated, response.IdResponse{Message: "Table deleted successfully"})
}
