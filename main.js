const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional: for isolating node.js context from renderer
      nodeIntegration: false, // Keep false for security
      contextIsolation: true, // Keep true for security
      sandbox: true, // Enable sandbox for enhanced security
      enableRemoteModule: false, // Disable remote module for security
    },
  });

  // Load the index.html of the app.
  // In a real-world scenario with a React build, you would point this to your bundled HTML file.
  // For this context, we assume the React app is served directly from index.html.
  win.loadFile('index.html');

  // Open the DevTools.
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// For API key handling in Electron:
// You'll need to set the API_KEY as an environment variable
// before starting the Electron app, or implement a secure way to load it.
// For example:
// process.env.API_KEY = 'YOUR_GEMINI_API_KEY';
// In this setup, we rely on the `process.env.API_KEY` being available
// in the execution environment where Electron is launched, similar to the web version.
