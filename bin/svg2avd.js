#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const promisify = require('util.promisify');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const pkg = require('../package.json');
const svg2vectordrawable = require('../lib/svg2vectordrawable.js');

let argv = process.argv.slice(2);

// https://github.com/veged/coa
require('coa').Cmd()
    .name(process.argv[1])
    .title(pkg.description)
    .helpful()

    .opt()
        .name('version')
        .title('Version')
        .short('v')
        .long('version')
        .flag()
        .act(function(opts) {
            return pkg.version;
        })
        .end()

    .opt()
        .name('input').title('Input file')
        .short('i')
        .long('input')
        .val(function(val) {
            return val || this.reject('Option "-i, --input" must have a value.');
        })
        .end()

    .opt()
        .name('folder').title('Input folder, convert all *.svg files')
        .short('f')
        .long('folder')
        .val(function(val) {
            return val || this.reject('Option "-f, --folder" must have a value.');
        })
        .end()

    .opt()
        .name('string').title('Input SVG code')
        .short('s')
        .long('string')
        .val(function(val) {
            if (/^<.*>$/s.test(val)) {
                return val;
            }
            else {
                return this.reject('Option "-s, --string" must be a SVG code.');
            }
        })
        .end()

    .opt()
        .name('output').title('Output file or folder (by default the same as the input)')
        .short('o')
        .long('output')
        .val(function(val) {
            return val || this.reject('Option "-o, --output" must have a value.');
        })
        .end()

    .act(function(opts, args) {
        let input = opts.input || args.input;
        let output = opts.output;
        let svgContent = opts.string;
        
        if (svgContent) {
            svg2vectordrawable(svgContent).then(xml => {
                if (output) {
                    if (!/\.xml$/i.test(output)) {
                        output += '.xml';
                    }
                    return writeFile(output, xml, 'utf8').then(() => {
                        console.log(`Save to "${output}".`);
                    });
                }
                else {
                    return console.log(xml);
                }
            });
        }
        else {
            
        }
        
        // console.log(opts)
        
    })
    .run(argv.length ? argv : ['-h']);



// function convertSvgContent(data, output) {
//     return svg2vectordrawable(data).then(xml => {
//         if (typeof output === 'undefined') {
//             process.stdout.write(xml);
//         }
//     });
// }


/**
 * Synchronously check if path is a directory. Tolerant to errors like ENOENT.
 * @param {string} path
 */
function checkIsDir(path) {
    try {
        return FS.lstatSync(path).isDirectory();
    } catch(e) {
        return false;
    }
}

function exit(error) {
    console.error(error);
    process.exit(1);
}