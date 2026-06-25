const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onFileOpened: (callback) => {
    ipcRenderer.on('file-opened', (event, filePath, content) => {
      callback(filePath, content);
    });
  },
  openFileDialog: async () => {
    return ipcRenderer.invoke('open-file-dialog');
  },
  readFile: async (filePath) => {
    return ipcRenderer.invoke('read-file', filePath);
  }
});

// Also handle file drop from OS
ipcRenderer.on('file-drop', (event, filePaths) => {
  // Will be handled by the web app's drop event
});
