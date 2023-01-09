package configs

type Config struct {
	AppTitle string
	Postgres PostgresConfig
}

type PostgresConfig struct {
	Host     string
	Port     string
	Username string
	Password string
	DbName   string
	SSLMode  string
}

func Init() *Config {
	return &Config{
		AppTitle: "Price Calculator",
		Postgres: PostgresConfig{},
	}
}
