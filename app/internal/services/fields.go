package services

import (
	"context"
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

func (s *FieldsService) Create(ctx context.Context, field models.FieldDTO) error {
	title := strings.ToLower(strings.ReplaceAll(field.Title, " ", "_"))
	field.Name = iuliia.Telegram.Translate(title)

	if err := s.repo.Create(field); err != nil {
		return err
	}
	return nil
}

func (s *FieldsService) CreateSeveral(ctx context.Context, fields []models.Field, tableId uuid.UUID) error {
	if err := s.repo.CreateSeveral(fields, tableId); err != nil {
		return err
	}
	return nil
}

func (s *FieldsService) Delete(ctx context.Context, field models.FieldDTO) error {
	if err := s.repo.Delete(field); err != nil {
		return err
	}
	return nil
}
