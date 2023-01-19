package postgres

import (
	"errors"
	"fmt"
	"strings"

	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type FieldRepo struct {
	db *sqlx.DB
}

func NewFieldRepo(db *sqlx.DB) *FieldRepo {
	return &FieldRepo{db: db}
}

func (r *FieldRepo) Create(field models.Field, tableName string) error {
	create := fmt.Sprintf(`ALTER TABLE %s ADD %s %s`, tableName, field.Title, field.TypeDb)
	if field.IsNotNull {
		create += " NOT NULL"
	}
	if field.Default != "" {
		create += fmt.Sprintf(" DEFAULT %s", field.Default)
	}

	if _, err := r.db.Exec(create); err != nil {
		return fmt.Errorf("не удалось создать колонку. ошибка: %w", err)
	}

	query := fmt.Sprintf(`INSERT INTO %s (id, table_id, title, type_db, type_app, number, is_for_search, formula, is_not_null, default) 
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, Fields)

	id := uuid.New()
	_, err := r.db.Exec(query, id, field.TableId, field.Title, field.TypeDb, field.TypeApp, field.Number, field.IsForSearch,
		field.Formula, field.IsNotNull, field.Default)
	if err != nil {
		return fmt.Errorf("не удалось добавить колонку. ошибка: %w", err)
	}
	return nil
}

func (r *FieldRepo) CreateSeveral(fields []models.Field) error {
	query := fmt.Sprintf("INSERT INTO %s (id, table_id, title, type_db, type_app, number, is_for_search, formula, is_not_null, default) VALUES ", Fields)

	args := make([]interface{}, 0)
	values := make([]string, 0, len(fields))

	c := 10
	for i, f := range fields {
		values = append(values, fmt.Sprintf("($%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d)",
			i*c+1, i*c+2, i*c+3, i*c+4, i*c+5, i*c+6, i*c+7, i*c+8, i*c+9, i*c+10))
		id := uuid.New()
		args = append(args, id, f.TableId, f.Title, f.TypeDb, f.TypeApp, f.Number, f.IsForSearch, f.Formula, f.IsNotNull, f.Default)
	}
	query += strings.Join(values, ", ")

	_, err := r.db.Exec(query, args...)
	if err != nil {
		return fmt.Errorf("не удалось добавить колонки. ошибка: %w", err)
	}
	return nil
}

func (r *FieldRepo) Update(field models.Field) error {
	return errors.New("not implemented")
}

func (r *FieldRepo) Delete(id uuid.UUID, tableName, columnName string) error {
	delete := fmt.Sprintf("ALTER TABLE %s DROP COLUMN %s", tableName, columnName)
	if _, err := r.db.Exec(delete); err != nil {
		return fmt.Errorf("не удалось удалить колонку. ошибка: %w", err)
	}

	query := fmt.Sprintf("DELETE FROM %s WHERE id=$1", Fields)
	if _, err := r.db.Exec(query, id); err != nil {
		return fmt.Errorf("не удалось удалить запись о колонке. ошибка: %w", err)
	}
	return nil
}
