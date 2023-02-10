package configs

import "time"

type (
	Config struct {
		AppTitle    string
		Environment string
		Redis       *RedisConfig
		Postgres    *PostgresConfig
		Auth        *AuthConfig
		Http        *HttpConfig
		Limiter     *LimiterConfig
	}

	RedisConfig struct {
		Host     string `mapstructure:"host"`
		Port     string `mapstructure:"port"`
		DB       int    `mapstructure:"db"`
		Password string
	}

	PostgresConfig struct {
		Host     string `mapstructure:"host"`
		Port     string `mapstructure:"port"`
		Username string `mapstructure:"username"`
		Password string
		DbName   string `mapstructure:"name"`
		SSLMode  string `mapstructure:"ssl"`
	}

	AuthConfig struct {
		AccessTokenTTL  time.Duration `mapstructure:"accessTokenTTL"`
		RefreshTokenTTL time.Duration `mapstructure:"refreshTokenTTL"`
		LimitAuthTTL    time.Duration `mapstructure:"limitAuthTTL"`
		CountAttempt    int32         `mapstructure:"countAttempt"`
		Secure          bool          `mapstructure:"secure"`
		Key             string
	}

	HttpConfig struct {
		Host               string        `mapstructure:"host"`
		Port               string        `mapstructure:"port"`
		ReadTimeout        time.Duration `mapstructure:"readTimeout"`
		WriteTimeout       time.Duration `mapstructure:"writeTimeout"`
		MaxHeaderMegabytes int           `mapstructure:"maxHeaderBytes"`
	}

	LimiterConfig struct {
		RPS   int           `mapstructure:"rps"`
		Burst int           `mapstructure:"burst"`
		TTL   time.Duration `mapstructure:"ttl"`
	}
)

func Init() *Config {
	return &Config{
		AppTitle: "Price Calculator",
		Postgres: &PostgresConfig{
			Host:     "127.0.0.1",
			Port:     "5432",
			Username: "postgres",
			Password: "postgres",
			DbName:   "price",
			SSLMode:  "disable",
		},
	}
}
