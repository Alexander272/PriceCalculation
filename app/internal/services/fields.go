package services

import (
	"strings"

	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
	"github.com/mehanizm/iuliia-go"
)

type FieldsService struct {
	repo repo.Field
}

func NewFieldsService(repo repo.Field) *FieldsService {
	return &FieldsService{repo: repo}
}

func (s *FieldsService) Create(field models.Field, tableName string) error {
	title := strings.ToLower(strings.ReplaceAll(field.Title, " ", "_"))
	field.Name = iuliia.Telegram.Translate(title)

	if err := s.repo.Create(field, tableName); err != nil {
		return err
	}
	return nil
}

func (s *FieldsService) CreateSeveral(fields []models.Field, tableId uuid.UUID) error {
	if err := s.repo.CreateSeveral(fields, tableId); err != nil {
		return err
	}
	return nil
}

func (s *FieldsService) Delete(id string, tableName, columnName string) error {
	if err := s.repo.Delete(id, tableName, columnName); err != nil {
		return err
	}
	return nil
}
