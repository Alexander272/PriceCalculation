package configs

import (
	"fmt"
	"os"
	"time"

	"github.com/kelseyhightower/envconfig"
	"github.com/spf13/viper"
)

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

// Инициализация конфига программы
func Init(configDir string) (conf *Config, err error) {

	if err := parseConfigFile(configDir); err != nil {
		return nil, fmt.Errorf("failed to parse config. err: %w", err)
	}

	conf = &Config{}
	if err := conf.unMarshal(); err != nil {
		return nil, fmt.Errorf("failed to unmarshal value. error: %w", err)
	}
	if err := conf.setFromEnv(); err != nil {
		return nil, fmt.Errorf("failed to get from env. error: %w", err)
	}

	return conf, nil
}

func parseConfigFile(folder string) error {
	viper.AddConfigPath(folder)
	viper.SetConfigName("config")

	return viper.MergeInConfig()
}

func (conf *Config) unMarshal() error {
	conf.Redis = &RedisConfig{}
	if err := viper.UnmarshalKey("redis", conf.Redis); err != nil {
		return fmt.Errorf("failed to unmarshal key redis. error: %w", err)
	}
	conf.Postgres = &PostgresConfig{}
	if err := viper.UnmarshalKey("postgres", conf.Postgres); err != nil {
		return fmt.Errorf("failed to unmarshal key postgres. error: %w", err)
	}
	conf.Http = &HttpConfig{}
	if err := viper.UnmarshalKey("http", conf.Http); err != nil {
		return fmt.Errorf("failed to unmarshal key http. error: %w", err)
	}
	conf.Limiter = &LimiterConfig{}
	if err := viper.UnmarshalKey("limiter", conf.Limiter); err != nil {
		return fmt.Errorf("failed to unmarshal key limiter. error: %w", err)
	}
	conf.Auth = &AuthConfig{}
	if err := viper.UnmarshalKey("auth", conf.Auth); err != nil {
		return fmt.Errorf("failed to unmarshal key auth. error: %w", err)
	}

	return nil
}

func (conf *Config) setFromEnv() error {
	if err := envconfig.Process("http", conf.Http); err != nil {
		return fmt.Errorf("failed to get http from env. error: %w", err)
	}
	if err := envconfig.Process("jwt", conf.Auth); err != nil {
		return fmt.Errorf("failed to get jwt from env. error: %w", err)
	}
	if err := envconfig.Process("redis", conf.Redis); err != nil {
		return fmt.Errorf("failed to get redis from env. error: %w", err)
	}
	if err := envconfig.Process("postgres", conf.Postgres); err != nil {
		return fmt.Errorf("failed to get postgres from env. error: %w", err)
	}

	conf.Environment = os.Getenv("APP_ENV")

	return nil
}
