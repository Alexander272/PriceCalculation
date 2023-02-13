package v1

import (
	"net/http"

	"github.com/Alexander272/price_calculation/internal/services"
	"github.com/Alexander272/price_calculation/models"
	"github.com/Alexander272/price_calculation/models/response"
	"github.com/gin-gonic/gin"
)

type CommonHandler struct {
	services *services.Services
}

func NewCommonHandler(services *services.Services) *CommonHandler {
	return &CommonHandler{
		services: services,
	}
}

func (h *Handler) InitCommonRoutes(api *gin.RouterGroup) {
	handlers := NewCommonHandler(h.services)

	common := api.Group("common-data")
	{
		common.GET("/all", handlers.GetAll)
		common.POST("/", handlers.Create)
		common.PUT("/", handlers.Update)
		common.DELETE("/:id", handlers.Delete)
	}
}

func (h *CommonHandler) GetAll(c *gin.Context) {
	var dto models.Table
	if err := c.BindJSON(&dto); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, err.Error(), "invalid data send")
		return
	}

	data, err := h.services.Common.GetAll(c, dto)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "failed to get data")
		return
	}

	c.JSON(http.StatusOK, response.DataResponse{Data: data, Count: len(data)})
}

func (h *CommonHandler) Create(c *gin.Context) {
	var dto models.Data
	if err := c.BindJSON(&dto); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, err.Error(), "invalid data send")
		return
	}

	if err := h.services.Common.Create(c, dto); err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "failed to create data")
		return
	}

	c.JSON(http.StatusCreated, response.IdResponse{Message: "Data created successfully"})
}

func (h *CommonHandler) Update(c *gin.Context) {
	var dto models.Data
	if err := c.BindJSON(&dto); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, err.Error(), "invalid data send")
		return
	}

	if err := h.services.Common.Update(c, dto); err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "failed to update data")
		return
	}

	c.JSON(http.StatusOK, response.IdResponse{Message: "Data updated successfully"})
}

func (h *CommonHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		response.NewErrorResponse(c, http.StatusBadRequest, "empty id", "empty id param")
		return
	}

	var dto models.Data
	if err := c.BindJSON(&dto); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, err.Error(), "invalid data send")
		return
	}

	if err := h.services.Common.Delete(c, dto.TableName, id); err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error(), "failed to delete data")
		return
	}

	c.JSON(http.StatusOK, response.IdResponse{Message: "Data deleted successfully"})
}
