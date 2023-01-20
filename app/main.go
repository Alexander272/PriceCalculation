package main

import (
	"embed"

	"github.com/Alexander272/price_calculation/root"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := root.NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:      app.Config.AppTitle,
		Width:      1024,
		Height:     768,
		Fullscreen: true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		// BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:  app.Startup,
		OnShutdown: app.Shutdown,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
