
const fs = require('fs');
const svgo = require('./lib/svgo'); // https://github.com/svg/svgo
// https://www.npmjs.com/package/svg-path-bounds

const svg2js = require('svgo/lib/svgo/svg2js');
const JS2SVG = require('svgo/lib/svgo/js2svg');



let svgstr = fs.readFileSync('./example/ai_image_1.svg').toString();


svgo(svgstr).then(svg => {
    console.log(svg)
    svg2js(svg, b => {
        // console.log(b.content[0])
        b.content[0].content.forEach(item => {
            console.log(item)
            console.log('-----')
        })
        //console.log(JS2SVG(b).data)
    })
});


// console.log()


// module.exports = function(svgstr) {
//     return new Promise((resolve, reject) => {
//         svgo.optimize(svgstr, result => {
//             if (result.error) {
//                 reject(result.error);
//             }
//             else {
//                 resolve(result.data);
//             }
//         })
//     });
// };
