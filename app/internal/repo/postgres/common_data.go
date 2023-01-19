package postgres

import (
	"fmt"
	"strings"

	"github.com/Alexander272/price_calculation/models"
	"github.com/jmoiron/sqlx"
)

type CommonRepo struct {
	db *sqlx.DB
}

func NewCommonRepo(db *sqlx.DB) *CommonRepo {
	return &CommonRepo{db: db}
}

// TODO нужно передать название таблицы, колонки и переменные по которым будет выбираться строка
func (r *CommonRepo) Get() (interface{}, error) {
	return nil, fmt.Errorf("not implemented")
}

// TODO нужно передать название таблицы, колонки
func (r *CommonRepo) GetAll(table models.Table) (data []interface{}, err error) {
	columns := []string{}
	for _, f := range table.Fields {
		columns = append(columns, f.Title)
	}

	query := fmt.Sprintf("SELECT %s FROM %s", strings.Join(columns, ", "), table.Title)

	if err = r.db.Select(&data, query); err != nil {
		return nil, fmt.Errorf("не удалось получить данные. ошибка: %w", err)
	}
	return data, nil
}

func (r *CommonRepo) Create(line models.Data) error {
	columns := make([]string, 0, len(line.Data))
	values := make([]string, 0, len(line.Data))
	args := make([]interface{}, 0)

	for i, l := range line.Data {
		columns = append(columns, l.Title)
		values = append(values, fmt.Sprintf("$%d", i+1))
		args = append(args, l.Value)
	}

	query := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s)", line.TableName, strings.Join(columns, ","), strings.Join(values, ","))

	_, err := r.db.Exec(query, args...)
	if err != nil {
		return fmt.Errorf("не удалось добавить данные. ошибка: %w", err)
	}
	return nil
}

func (r *CommonRepo) Update() error {
	return fmt.Errorf("not implemented")
}

func (r *CommonRepo) Delete() error {
	return fmt.Errorf("not implemented")
}
