package services

import (
	"context"

	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
)

type CommonService struct {
	repo repo.Common
}

func NewCommonService(repo repo.Common) *CommonService {
	return &CommonService{repo: repo}
}

func (s *CommonService) GetAll(ctx context.Context, table models.Table) ([]models.DataLine, error) {
	rows, err := s.repo.GetAll(table)
	if err != nil {
		return nil, err
	}
	return rows, nil
}

func (s *CommonService) Create(ctx context.Context, line models.Data) error {
	if err := s.repo.Create(line); err != nil {
		return err
	}
	return nil
}

func (s *CommonService) CreateSeveral(ctx context.Context, table models.NewData) error {
	return nil
}

func (s *CommonService) Update(ctx context.Context, line models.Data) error {
	if err := s.repo.Update(line); err != nil {
		return err
	}
	return nil
}

func (s *CommonService) Delete(ctx context.Context, tableName string, id string) error {
	if err := s.repo.Delete(tableName, id); err != nil {
		return err
	}
	return nil
}
