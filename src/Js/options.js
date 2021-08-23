const button1 = document.getElementById('opt-button1');
const button2 = document.getElementById('opt-button2');
const button3 = document.getElementById('opt-button3');
const button4 = document.getElementById('opt-button4');

const { remote } = require('electron')
const main = remote.require('./main')

button1.addEventListener("click", e => {
    main.optResume();
})

button2.addEventListener("click", e => {
    main.optSave();
    main.optResume();
})

button3.addEventListener("click", e =>{
    main.optMain();
})

button4.addEventListener("click", e =>{
    main.optClose();
})