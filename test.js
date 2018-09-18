
const fs = require('fs');
const svg2vectordrawable = require('./lib/svg2vectordrawable');


let svgCode = fs.readFileSync('./example/ai_image_4.svg').toString();

svg2vectordrawable(svgCode).then(xmlCode => {
    console.log(xmlCode);
}).catch(err => {
    return console.error(err.message);
});