const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600, fullscreen: true, frame: false});
  win.loadFile('index.html');

  win.on('closed', () => {
    win = null;
  });
}

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);