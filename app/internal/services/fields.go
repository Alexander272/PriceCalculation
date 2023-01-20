package services

import (
	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
)

type FieldsService struct {
	repo repo.Field
}

func NewFieldsService(repo repo.Field) *FieldsService {
	return &FieldsService{repo: repo}
}

func (s *FieldsService) Create(field models.Field, tableName string) error {
	if err := s.repo.Create(field, tableName); err != nil {
		return err
	}
	return nil
}

func (s *FieldsService) CreateSeveral(fields []models.Field) error {
	if err := s.repo.CreateSeveral(fields); err != nil {
		return err
	}
	return nil
}

func (s *FieldsService) Delete(id uuid.UUID, tableName, columnName string) error {
	if err := s.repo.Delete(id, tableName, columnName); err != nil {
		return err
	}
	return nil
}
