package postgres

import (
	"fmt"
	"strings"

	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
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
		if l.Title == "id" {
			id := uuid.New()
			args = append(args, id)
		} else {
			args = append(args, l.Value)
		}
	}

	query := fmt.Sprintf("INSERT INTO %s (%s) VALUES (%s)", line.TableName, strings.Join(columns, ","), strings.Join(values, ","))

	_, err := r.db.Exec(query, args...)
	if err != nil {
		return fmt.Errorf("не удалось добавить данные. ошибка: %w", err)
	}
	return nil
}

func (r *CommonRepo) Update(line models.Data) error {
	values := make([]string, 0, len(line.Data))
	args := make([]interface{}, 0)

	count := 1
	var id interface{}
	for _, l := range line.Data {
		if l.Title != "id" {
			values = append(values, fmt.Sprintf("%s=$%d", l.Title, count))
			count += 1
			args = append(args, l.Value)
		} else {
			id = l.Value
		}
	}
	args = append(args, id)

	query := fmt.Sprintf(`UPDATE %s	SET %s WHERE id=$%d`, line.TableName, strings.Join(values, ", "), count)

	if _, err := r.db.Exec(query, args...); err != nil {
		return fmt.Errorf("не удалось обновить данные. ошибка: %w", err)
	}
	return nil
}

func (r *CommonRepo) Delete(tableName string, id string) error {
	query := fmt.Sprintf("DELETE FROM %s WHERE id=$1", tableName)

	if _, err := r.db.Exec(query, id); err != nil {
		return fmt.Errorf("не удалось удалить данные. ошибка: %w", err)
	}
	return nil
}
