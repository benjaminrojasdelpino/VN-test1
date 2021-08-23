const {newWindow} = require('./main')
const {app} = require('electron')

require('electron-reload')(__dirname)

app.whenReady().then(newWindow);
console.log('Hello world')