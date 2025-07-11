const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'resources', 'icon.png'),
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true // Включаем поддержку webview
    }
  });

  // Загружаем HTML с кастомным интерфейсом
  win.loadFile('index.html');

  // Обработка команд управления окном
  ipcMain.on('window-control', (event, action) => {
    switch (action) {
      case 'close':
        win.close();
        break;
      case 'minimize':
        win.minimize();
        break;
      case 'maximize':
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
        break;
    }
  });
}

app.whenReady().then(createWindow);