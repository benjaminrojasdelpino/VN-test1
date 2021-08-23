

const button1 = document.getElementById('menu-button1');
const button2 = document.getElementById('menu-button2');
const button4 = document.getElementById('menu-button4');

const { remote } = require('electron');
const main = remote.require('./main')

button1.addEventListener("click", e => {
    main.newGame();
    let aux = main.getSave();
    if(aux == 0){
        main.window1();
    }
})

button2.addEventListener("click", e => {
    //main.readSave();
    let aux = main.getSave();
    if(aux == 0){
        main.window1();
    }
    else if(aux == 2){
        main.window2();
    }
    else if(aux == 3){
        main.window3();
    }
})

button4.addEventListener("click", e => {
    main.mainClose();
})