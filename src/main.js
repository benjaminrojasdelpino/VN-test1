const {BrowserWindow} = require('electron')
const fs = require('fs')
const { stringify } = require('querystring')
let win         // VENTANA PRINCIPAL
let opt         // VENTANA DE OPCIONES
let save        //SAVE QUE SE MUEVE DURANTE EL JUEGO
let realSave    // SAVE QUE SE GUARDA
let heroines
let realHeroines

//CREACION DE LA VENTANA PRINCIPAL, SE LLAMA AL COMENZAR
function newWindow(){
    win = new BrowserWindow({
        width: 800,           
        height: 600,
        fullscreen:true, 
        frame:false,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    readSave();       //AL INICIAR EL PROGRAMA LEE EL SAVE DEL ARCHIVO
    readHeroines();
    win.loadFile('src/views/index.html');
}

function mainClose(){
    win.close();
}

function optionsWindow(){
    opt = new BrowserWindow({
        width: 500,
        height: 370,
        frame:false,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    opt.loadFile('src/views/options.html');
}

function optResume(){
    opt.close();
}

function optMain(){
    opt.close();
    win.loadFile('src/views/index.html');
}
function optClose(){
    opt.close();
    win.close();
}

function optSave(){
    fs.writeFile('save.txt', save, (err) => {       
        // In case of a error throw err. 
        if (err) throw err;
        saveHeroines();
        readSave();
        console.log(save);
    }) 
}

function getSave(){
    return realSave;
}

function readSave(){
    fs.readFile("save.txt", (err, data) => {
        if (err) throw err;
        realSave = data.toString();
        save = realSave;
    })
}

function saveHeroines(){
    realHeroines = heroines;
    fs.writeFile('heroines.json', Buffer.from(JSON.stringify(realHeroines)), (err) => {       
        // In case of a error throw err. 
        if (err) throw err;
    }) 
}

function readHeroines(){
    fs.readFile("heroines.json", (err, data) => {
        if (err) throw err;
        heroines = JSON.parse(data);
        realHeroines = heroines;
    })
}

function newGame(){
    realSave = 0;
    save = 0;
    optSave();
}

function window1(){
    win.loadFile('src/views/window1.html');
}

function window2(){
    win.loadFile('src/views/window2.html');
    save = 2;
}

function window3(){
    win.loadFile('src/views/window3.html');
    save = 3;
}

module.exports = {
    newWindow,
    window1,
    window2,
    window3,
    optionsWindow,
    optResume,
    optMain,
    optClose,
    optSave,
    getSave,
    readSave,
    newGame,
    mainClose
}