package services

import (
	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
)

type CommonService struct {
	repo repo.Common
}

func NewCommonService(repo repo.Common) *CommonService {
	return &CommonService{repo: repo}
}

// struct [][]{ value interface{} }

func (s *CommonService) GetAll(table models.Table) ([][]interface{}, error) {
	data, err := s.repo.GetAll(table)
	if err != nil {
		return nil, err
	}
	return data, nil
}

func (s *CommonService) GetAllNew(table models.Table) ([]models.DataLine, error) {
	rows, err := s.repo.GetAllNew(table)
	if err != nil {
		return nil, err
	}
	return rows, nil
}

func (s *CommonService) Create(line models.Data) error {
	if err := s.repo.Create(line); err != nil {
		return err
	}
	return nil
}

func (s *CommonService) CreateSeveral(table models.NewData) error {
	return nil
}

func (s *CommonService) Update(line models.Data) error {
	if err := s.repo.Update(line); err != nil {
		return err
	}
	return nil
}

func (s *CommonService) Delete(tableName string, id string) error {
	if err := s.repo.Delete(tableName, id); err != nil {
		return err
	}
	return nil
}
