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
    realHeroines[3].intimacy = 500;
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

//SUBIR INTIMIDAD, HAY QUE BUSCAR VALORES COMODOS

function littlePlusIntimacy(i){
    heroines[i].intimacy = heroines[i].intimacy + 100;
}

function mediumPlusIntimacy(i){
    heroines[i].intimacy = heroines[i].intimacy + 300;
}

function bigPlusIntimacy(i){
    heroines[i].intimacy = heroines[i].intimacy + 800;
}


//VENTANAS

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

function window4(){
    win.loadFile('src/views/window4.html');
    save = 4;
}

module.exports = {
    newWindow,
    window1,
    window2,
    window3,
    window4,
    optionsWindow,
    optResume,
    optMain,
    optClose,
    optSave,
    getSave,
    readSave,
    newGame,
    mainClose,
    littlePlusIntimacy,
    mediumPlusIntimacy,
    bigPlusIntimacy
}