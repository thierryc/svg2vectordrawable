
const fs = require('fs');
const svgo = require('./lib/svgo');
const svg2js = require('./lib/svg2js');




const util = require('util');




const JS2SVG = require('svgo/lib/svgo/js2svg');



let svgstr = fs.readFileSync('./example/ai_image_1.svg').toString();

(async() => {

    let svgOptimized = await svgo(svgstr);
    let jsObj = await svg2js(svgOptimized);

    await console.log(jsObj)

})();

svgo(svgstr).then(svg => {
    console.log(svg)
    // svg2js(svg, b => {



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
