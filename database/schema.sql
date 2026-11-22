
'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mpAPI', {
    getVersion: () => ipcRenderer.invoke('app:get-version'),

    clientes: {
        listar: (pesquisa = '') =>
            ipcRenderer.invoke('clientes:listar', pesquisa),

        criar: (dados) =>
            ipcRenderer.invoke('clientes:criar', dados),

        atualizar: (id, dados) =>
            ipcRenderer.invoke('clientes:atualizar', id, dados),

        excluir: (id) =>
            ipcRenderer.invoke('clientes:excluir', id)
    }
});
