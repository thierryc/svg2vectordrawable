
const svgo = require('./svgo');
const svg2js = require('./svg2js');
const js2vectordrawable = require('./js2vectordrawable');

module.exports = function(content) {
    return new Promise((resolve, reject) => {
        svgo(content).then(svgOptimized => {
            svg2js(svgOptimized).then(jsObj => {
                let xml = js2vectordrawable(jsObj);
                resolve(xml);
            })
                .catch(err => reject(err));
        })
            .catch(err => reject(err));
    });
}