#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const package = require('../package.json');

let argv = process.argv.slice(2);

// https://github.com/veged/coa
require('coa').Cmd()
    .name(process.argv[1])
    .title(package.description)
    .helpful()

    .opt()
        .name('version')
        .title('Version')
        .short('v')
        .long('version')
        .flag()
        .act(function(opts) {
            return package.version;
        })
        .end()

    .opt()
        .name('input').title('Input file, "-" for STDIN')
        .short('i')
        .long('input')
        .arr()
        .val(function(val) {
            return val || this.reject("Option '--input' must have a value.");
        })
        .end()

    .opt()
        .name('folder').title('Input folder, optimize and rewrite all *.svg files')
        .short('f')
        .long('folder')
        .val(function(val) {
            return val || this.reject("Option '--folder' must have a value.");
        })
        .end()

    .opt()
        .name('string').title('Input SVG data string')
        .short('s')
        .long('string')
        .end()

    .opt()
        .name('output').title('Output file or folder (by default the same as the input), "-" for STDOUT')
        .short('o')
        .long('output')
        .arr()
        .val(function(val) {
            return val || this.reject("Option '--output' must have a value.");
        })
        .end()

    .act(function(opts, args) {
        let input = opts.input || args.input;
        let output = opts.output;

        // if (
        //     (!input || input[0] === '-') &&
        //     !opts.string &&
        //     !opts.stdin &&
        //     !opts.folder &&
        //     process.stdin.isTTY === true
        // ) {
        //     return this.usage();
        // }

        console.log(args)
        console.log(opts)
        
    })
    .run(argv.length ? argv : ['-h']);