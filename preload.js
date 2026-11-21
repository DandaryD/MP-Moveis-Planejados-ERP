const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mpAPI', {
    getVersion: () => ipcRenderer.invoke('app:get-version')
});