const row = document.getElementById('row-continue');
const options = document.getElementById('options');

const { remote } = require('electron')
const main = remote.require('./main')

row.addEventListener("click", e => {
    main.window3();
})

options.addEventListener("click", e =>{
    main.optionsWindow();
})