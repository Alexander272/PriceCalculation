package services

import (
	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
)

type TablesListService struct {
	repo   repo.TablesList
	fields Fields
}

func NewTablesListService(repo repo.TablesList, fields Fields) *TablesListService {
	return &TablesListService{
		repo:   repo,
		fields: fields,
	}
}

func (s *TablesListService) GetAll() ([]models.Table, error) {
	tables, err := s.repo.GetAll()
	if err != nil {
		return nil, err
	}
	return tables, nil
}

func (s *TablesListService) Create(table models.Table) error {
	if err := s.fields.CreateSeveral(table.Fields); err != nil {
		return err
	}

	if err := s.repo.Create(table); err != nil {
		return err
	}
	return nil
}

func (s *TablesListService) Delete(id uuid.UUID, table string) error {
	if err := s.repo.Delete(id, table); err != nil {
		return err
	}
	return nil
}
