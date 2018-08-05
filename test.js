
const fs = require('fs');
const svgo = require('./lib/svgo');
const svg2js = require('./lib/svg2js');
const js2vectordrawable = require('./lib/js2vectordrawable');
// const js2vector = require('./lib/js2vector');

const util = require('util');

const JS2SVG = require('svgo/lib/svgo/js2svg');

let svgstr = fs.readFileSync('./example/sketch_face.svg').toString();

(async() => {

    let svgOptimized = await svgo(svgstr);
    let jsObj = await svg2js(svgOptimized);
    let xml = js2vectordrawable(jsObj);



    console.log(svgOptimized);
    //console.log(jsObj);
    console.log(xml)

})();


function convert(data) {
    let dataCopy = data.clone();

    // travel(dataCopy);

    return dataCopy;

    // function travel(data) {
    //     if (data.content) {
    //         data.content.forEach(item => {
    //             // if (item.elem) {
    //             //     travel(item);
    //             // }
    //         });
    //     }
    // }




}


// svgo('<path d="M19,8 L19,9.00544301 C19,9.34308386 18.9759977,9.67513707 18.9296129,10 L19.4996703,10 C20.0492341,10 20.5,9.54983823 20.5,9 C20.5,8.44962415 20.0506752,8 19.4996703,8 L19,8 Z M18.3265344,12 C17.2018661,14.364785 14.7879364,16 12,16 C8.13400675,16 5,12.8580054 5,9.00544301 L5,6 L19,6 L19.4996703,6 C21.1567066,6 22.5,7.34651712 22.5,9 C22.5,10.6568542 21.1513555,12 19.4996703,12 L18.3265344,12 Z M4,18 L20,18 L20,20 L4,20 L4,18 Z"></path>').then(svg => {
//     console.log(svg)
// });



//console.log(util.inspect(b, { compact: false ,  depth: 5 }))

// let cache = [];
// let r = JSON.stringify(b, function(key, value) {
//     if (typeof value === 'object' && value !== null) {
//         if (cache.indexOf(value) !== -1) {
//             // Duplicate reference found
//             try {
//                 // If this value does not reference a parent it can be deduped
//                 return JSON.parse(JSON.stringify(value));
//             } catch (error) {
//                 // discard key if value cannot be deduped
//                 return;
//             }
//         }
//         // Store value in our collection
//         cache.push(value);
//     }
//     return value;
// }, 2);
//
// console.log(r)
//
// cache = null; // Enable garbage collection

// console.log(b.content[0])
// b.content[0].content.forEach(item => {
//     // console.log(item)
//     console.log(JSON.stringify(item))
//     console.log('-----')
// })


// console.log(JS2SVG(b, defaults).data)
// })
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
