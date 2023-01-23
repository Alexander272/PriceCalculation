package services

import (
	"strings"

	"github.com/Alexander272/price_calculation/internal/repo"
	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
	"github.com/mehanizm/iuliia-go"
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
	id := uuid.New()
	title := strings.ToLower(strings.ReplaceAll(table.Title, " ", "_"))
	table.TitleDb = iuliia.Telegram.Translate(title)

	for i, f := range table.Fields {
		title := strings.ToLower(strings.ReplaceAll(f.Title, " ", "_"))
		table.Fields[i].Name = iuliia.Telegram.Translate(title)
	}

	if err := s.repo.Create(table, id); err != nil {
		return err
	}

	if err := s.fields.CreateSeveral(table.Fields, id); err != nil {
		return err
	}

	return nil
}

func (s *TablesListService) Delete(id string, table string) error {
	if err := s.repo.Delete(id, table); err != nil {
		return err
	}
	return nil
}
