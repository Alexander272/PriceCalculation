package v1

import (
	"net/http"

	"github.com/Alexander272/price_calculation/internal/services"
	"github.com/Alexander272/price_calculation/models"
	"github.com/Alexander272/price_calculation/models/response"
	"github.com/gin-gonic/gin"
)

type FieldHandler struct {
	services *services.Services
}

func NewFieldHandler(services *services.Services) *FieldHandler {
	return &FieldHandler{services: services}
}

func (h *Handler) InitFieldsRoutes(api *gin.RouterGroup) {
	handlers := NewFieldHandler(h.services)

	fields := api.Group("/fields")
	{
		fields.POST("/", handlers.Create)
		fields.DELETE("/:id", handlers.Delete)
	}
}

func (h *FieldHandler) Create(c *gin.Context) {
	var dto models.FieldDTO
	if err := c.BindJSON(&dto); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, err.Error(), "invalid data send")
		return
	}

	if err := h.services.Fields.Create(c, dto); err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "something went wrong")
		return
	}

	c.JSON(http.StatusCreated, response.IdResponse{Message: "Field created successfully"})
}

func (h *FieldHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		response.NewErrorResponse(c, http.StatusBadRequest, "empty id", "empty id param")
		return
	}

	var dto models.FieldDTO
	if err := c.BindJSON(&dto); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, err.Error(), "invalid data send")
		return
	}
	dto.Id = id

	if err := h.services.Fields.Delete(c, dto); err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "something went wrong")
		return
	}

	c.JSON(http.StatusCreated, response.IdResponse{Message: "Field deleted successfully"})
}
