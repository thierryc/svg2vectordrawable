
const svg2js = require('svgo/lib/svgo/svg2js');

module.exports = function(svgstr) {
    return new Promise((resolve, reject) => {
        svg2js(svgstr, result => {
            if (result.err) {
                reject(result.err);
            }
            else {
                resolve(result);
            }
        });
    });
};