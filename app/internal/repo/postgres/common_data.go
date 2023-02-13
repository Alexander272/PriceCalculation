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

// * нужно передать название таблицы, колонки
func (r *CommonRepo) GetAll(table models.Table) (list []models.DataLine, err error) {
	columns := []string{"id::text"}
	for _, f := range table.Fields {
		columns = append(columns, f.Name)
	}

	query := fmt.Sprintf("SELECT %s FROM %s", strings.Join(columns, ", "), table.TitleDb)

	rows, err := r.db.Queryx(query)
	if err != nil {
		return nil, fmt.Errorf("не удалось получить данные. ошибка: %w", err)
	}

	for rows.Next() {
		data := make(map[string]interface{}, 0)
		if err := rows.MapScan(data); err != nil {
			return nil, fmt.Errorf("не удалось сканировать результат выборки. ошибка: %w", err)
		}

		columns, err := rows.Columns()
		if err != nil {
			return nil, fmt.Errorf("не удалось прочитать колонки. ошибка: %w", err)
		}

		values := make([]models.DataValue, 0, len(columns))
		for _, v := range columns {
			if v == "id" {
				continue
			}

			id := uuid.New()
			values = append(values, models.DataValue{
				Id:    id.String(),
				Title: v,
				Value: data[v],
			})
		}

		list = append(list, models.DataLine{
			Id:   data["id"].(string),
			Data: values,
		})
	}

	return list, nil
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

func (r *CommonRepo) CreateSeveral(table models.NewData) error {
	columns := make([]string, 0, len(table.Lines[0].Data))
	values := make([]string, 0, len(table.Lines))
	args := make([]interface{}, 0, len(table.Lines)*len(table.Lines[0].Data))

	count := 0
	for i, l := range table.Lines {
		temp := make([]string, 0, len(l.Data))
		for _, d := range l.Data {
			if i == 0 {
				columns = append(columns, d.Title)
			}
			count++
			temp = append(temp, fmt.Sprintf("$%d", count))

			if d.Title == "id" {
				id := uuid.New()
				args = append(args, id)
			} else {
				args = append(args, d.Value)
			}
		}
		values = append(values, fmt.Sprintf("(%s)", strings.Join(temp, ",")))
	}

	query := fmt.Sprintf("INSERT INTO %s (%s) VALUES %s", table.TableName, strings.Join(columns, ","), strings.Join(values, ","))

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
