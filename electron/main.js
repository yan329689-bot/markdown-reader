const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow = null;

function createWindow(filePath) {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 400,
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#FAFAF7',
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (filePath) {
      openFile(filePath);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function openFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (mainWindow) {
      mainWindow.webContents.send('file-opened', filePath, content);
    }
  } catch (err) {
    console.error('Failed to read file:', err);
  }
}

// Handle file open from dialog
ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'mdown', 'mkd', 'txt'] }
    ]
  });
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths;
  }
  return [];
});

// Handle file read
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { success: true, content };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Handle drag & drop
app.on('open-file', (event, filePath) => {
  event.preventDefault();
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
    openFile(filePath);
  } else {
    createWindow(filePath);
  }
});

// Handle second instance (when user opens another .md while app is running)
app.on('second-instance', (event, argv) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
  // Check argv for file path
  const filePath = argv.find(arg => arg.match(/\.(md|markdown|mdown|mkd|txt)$/i));
  if (filePath) {
    openFile(filePath);
  }
});

app.whenReady().then(() => {
  // Check for file path passed as argument
  const filePath = process.argv.find(arg => arg.match(/\.(md|markdown|mdown|mkd|txt)$/i));
  createWindow(filePath);
});

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
