package services

type Calculation interface{}

type Services struct {
	Calculation
}

func NewService() *Services {
	return &Services{}
}
