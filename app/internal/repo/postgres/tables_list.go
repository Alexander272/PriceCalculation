package postgres

import (
	"fmt"
	"log"
	"strings"

	"github.com/Alexander272/price_calculation/models"
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type TableListRepo struct {
	db *sqlx.DB
}

func NewTableListRepo(db *sqlx.DB) *TableListRepo {
	return &TableListRepo{db: db}
}

type Table struct {
	Id          string `db:"id"`
	Title       string `db:"title"`
	TitleDb     string `db:"title_db"`
	Alias       string `db:"alias"`
	Color       string `db:"color"`
	FieldId     string `db:"field_id"`
	FieldTitle  string `db:"field_title"`
	FieldName   string `db:"name"`
	TypeDb      string `db:"type_db"`
	TypeApp     string `db:"type_app"`
	Number      string `db:"number"`
	IsForSearch bool   `db:"is_for_search"`
	Formula     string `db:"formula"`
	IsNotNull   bool   `db:"is_not_null"`
	Default     string `db:"default"`
}

func (r *TableListRepo) GetAll() (tables []models.Table, err error) {
	query := fmt.Sprintf(`SELECT %s.id, %s.title, title_db, alias, color, %s.id as field_id, %s.title as field_title, name, 
		type_db, type_app, concat(alias, number) as number, is_for_search, formula, is_not_null, "default"
		FROM %s INNER JOIN %s ON %s.id=table_id`,
		TablesListTable, TablesListTable, FieldsTable, FieldsTable, TablesListTable, FieldsTable, TablesListTable,
	)

	t := []Table{}
	if err := r.db.Select(&t, query); err != nil {
		return nil, fmt.Errorf("не удалось получить список таблиц. ошибка: %w", err)
	}

	for i, t := range t {
		if i == 0 || tables[len(tables)-1].Id != t.Id {
			tables = append(tables, models.Table{
				Id:      t.Id,
				Title:   t.Title,
				TitleDb: t.TitleDb,
				Alias:   t.Alias,
				Color:   t.Color,
				Fields: []models.Field{{
					Id:          t.FieldId,
					TableId:     t.Id,
					Title:       t.FieldTitle,
					Name:        t.FieldName,
					TypeDb:      t.TypeDb,
					TypeApp:     t.TypeApp,
					Number:      t.Number,
					IsForSearch: t.IsForSearch,
					Formula:     t.Formula,
					IsNotNull:   t.IsNotNull,
					Default:     t.Default,
				}},
			})
		} else {
			tables[len(tables)-1].Fields = append(tables[len(tables)-1].Fields, models.Field{
				Id:          t.FieldId,
				TableId:     t.Id,
				Title:       t.FieldTitle,
				Name:        t.FieldName,
				TypeDb:      t.TypeDb,
				TypeApp:     t.TypeApp,
				Number:      t.Number,
				IsForSearch: t.IsForSearch,
				Formula:     t.Formula,
				IsNotNull:   t.IsNotNull,
				Default:     t.Default,
			})
		}
	}

	return tables, nil
}

func (r *TableListRepo) Create(table models.Table, id uuid.UUID) error {
	fields := []string{}
	for _, f := range table.Fields {
		line := fmt.Sprintf("%s %s", f.Name, f.TypeDb)
		if f.IsNotNull {
			line += " NOT NULL"
		}
		if f.Default != "" {
			line += fmt.Sprintf(" DEFAULT %s", f.Default)
		}
		fields = append(fields, line)
	}

	create := fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (id uuid NOT NULL, %s, CONSTRAINT %s_id PRIMARY KEY (id))
		TABLESPACE pg_default;
		ALTER TABLE IF EXISTS %s OWNER to postgres;`,
		table.TitleDb, strings.Join(fields, ","), table.TitleDb, table.TitleDb,
	)
	log.Println(create)
	if _, err := r.db.Exec(create); err != nil {
		return fmt.Errorf("не удалось создать таблицу. ошибка: %w", err)
	}

	query := fmt.Sprintf("INSERT INTO %s (id, title, title_db, alias, color) VALUES ($1, $2, $3, $4, $5)", TablesListTable)

	if _, err := r.db.Exec(query, id, table.Title, table.TitleDb, table.Alias, table.Color); err != nil {
		return fmt.Errorf("не удалось добавить таблицу. ошибка: %w", err)
	}
	return nil
}

func (r *TableListRepo) Delete(id string, table string) error {
	delete := fmt.Sprintf("DROP TABLE IF EXISTS %s", table)
	if _, err := r.db.Exec(delete); err != nil {
		return fmt.Errorf("не удалось удалить таблицу. ошибка: %w", err)
	}

	query := fmt.Sprintf("DELETE FROM %s WHERE di=$1", TablesListTable)

	if _, err := r.db.Exec(query, id); err != nil {
		return fmt.Errorf("не удалось удалить запись о таблице. ошибка: %w", err)
	}
	return nil
}
