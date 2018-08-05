
const svgPathBounds = require('svg-path-bounds'); // https://www.npmjs.com/package/svg-path-bounds
const EOL = require('os').EOL;

let JS2XML = function() {
    this.indentLevel = 0;
    this.gradients = [];
    this.masks = [];
    this.tagConvert = {
        'svg': 'vector',
        'g': 'group',
        'path': 'path',
        'rect': 'path',
        'circle': 'path',
        'polygon': 'path',
        'ellipse': 'path',
        'polyline': 'path',
        'line': 'path',
        'clipPath': 'clip-path',
        'mask': 'path'
    };
    this.attrConvert = {
        'name': 'android:name',
        'id': 'android:name',
        // svg - vector
        'width': 'android:width',
        'height': 'android:height',
        'viewBox': '',
        'viewportWidth': 'android:viewportWidth',
        'viewportHeight': 'android:viewportHeight',
        // g
        'opacity': 'android:alpha',
        'transform': '',
        // path
        'd': 'android:pathData',
        'fill': 'android:fillColor',
        'fill-opacity': 'android:fillAlpha',
        'stroke': 'android:strokeColor',
        'stroke-width': 'android:strokeWidth',
        'stroke-opacity': 'android:strokeAlpha',
        'stroke-linecap': 'android:strokeLineCap',
        'stroke-linejoin': 'android:strokeLineJoin',
        'stroke-miterlimit': 'android:strokeMiterLimit'
    };
    this.xmlEncoding = '<?xml version="1.0" encoding="utf-8"?>';
    this.aaptXMLNS = 'xmlns:aapt="http://schemas.android.com/aapt"';
};

// JS2XML.prototype.convert = function(data) {
//
//     // console.log(data.querySelectorAll('mask use'));
//     // console.log(data.querySelector('g>mask#d'));
//     return this.travel(data);
// };

JS2XML.prototype.refactData = function(data) {


    // this.refactTravel(data);
    return data.clone();
};

JS2XML.prototype.refactTravel = function(data) {
    if (data.content) {
        data.content.forEach(item => {
            // if (item.elem) {
            if (Object.keys(this.tagConvert).indexOf(item.elem) >= 0) {
                this.refactChild(item);
            }
        });
    }
};

JS2XML.prototype.refactChild = function(data) {

    if (data.isElem('svg')) {
        let width = '24dp';
        let height = '24dp';
        let viewportWidth = 24;
        let viewportHeight = 24;
        if (data.hasAttr('width') && data.hasAttr('height')) {
            width = data.attr('width').value;
            height = data.attr('height').value;
        }
        if (data.hasAttr('viewBox')) {
            let [x, y, w, h] = data.attr('viewBox').value.split(/\s*/);
            viewportWidth = w;
            viewportHeight = h;
            if (!data.hasAttr('width') && !data.hasAttr('height')) {
                width = w;
                height = h;
            }
        }
        data.attrs = {};
        data.addAttr({
            name: 'xmlns:android',
            value: 'http://schemas.android.com/apk/res/android',
            prefix: 'xmlns',
            local: 'android'
        });
        // SVG is not support sweep (angular) gradient
        if (data.querySelector('radialGradient, linearGradient')) {
            data.addAttr({
                name: 'xmlns:aapt',
                value: 'http://schemas.android.com/aapt',
                prefix: 'xmlns',
                local: 'aapt'
            });
        }
        data.addAttr({
            name: 'android:width',
            value: width,
            prefix: 'android',
            local: 'width'
        });
        data.addAttr({
            name: 'android:height',
            value: height,
            prefix: 'android',
            local: 'height'
        });
        data.addAttr({
            name: 'android:viewportWidth',
            value: viewportWidth,
            prefix: 'android',
            local: 'viewportWidth'
        });
        data.addAttr({
            name: 'android:viewportHeight',
            value: viewportHeight,
            prefix: 'android',
            local: 'viewportHeight'
        });
    }


    // Rename svg tag to Android vector drawable tag.
    data.renameElem(this.tagConvert[data.elem]);

    if (data.isEmpty()) {
        //     let processedData = '';
        //     processedData += this.convert(data);
        console.log('-------');
        console.log(data.elem);
        console.log(data.attrs);
        // console.log(data);

    }
    else {

        console.log('-------');
        console.log(data.elem);
        console.log(data.attrs);
        // console.log(data);

        this.refactTravel(data);


    }
};




JS2XML.prototype.createElement = function(data) {

    if (data.isElem('svg')) {
        if (data.hasAttr('width') && data.hasAttr('height')) {
            this.width = data.attr('width').value + 'dp';
            this.height = data.attr('height').value + 'dp';
        }
        else {
            if (data.hasAttr('viewBox')) {
                let [x, y, w, h] = data.attr('viewBox').value.split(/\s*/);
                this.width = w + 'dp';
                this.height = h + 'dp';
            }
        }
        data.attrs['width']['value'] = this.width;
        data.attrs['height']['value'] = this.height;
    }

    // Ignore not support tags.
    if (Object.keys(this.tagConvert).indexOf(data.elem) === -1) {
        return '';
    }

    // Ignore mask
    if (Object.keys(this.tagConvert).indexOf(data.elem) >= 0 && data.hasAttr('mask')) {
        return '';
    }


    // Rename svg tag to Android vector drawable tag.
    data.renameElem(data.elem + '-' + this.tagConvert[data.elem]);

    if (data.isEmpty()) {
        //     let processedData = '';
        //     processedData += this.convert(data);
        console.log(this.indentLevel + '-------');
        console.log(data.elem);
        console.log(data.attrs);
        // console.log(data);

        return this.createIndent() +
            '<' +
            data.elem +
            this.createAttrs(data) +
            '/>' +
            EOL;
    }
    else {
        let processedData = '';
        console.log(this.indentLevel + '-------');
        console.log(data.elem);
        console.log(data.attrs);
        // console.log(data);

        processedData += this.travel(data);

        return this.createIndent() +
            '<' +
            data.elem +
            this.createAttrs(data) +
            '>' +
            EOL +
            processedData +
            this.createIndent() +
            '</' +
            data.elem +
            '>' +
            EOL;
    }
};

JS2XML.prototype.createAttrs = function(elem) {
    let attrs = '';
    elem.eachAttr(function(attr) {
        if (attr.value !== undefined) {
            attrs += EOL + this.createIndent() + '    ' + attr.name + '="' + attr.value + '"';
        }
    }, this);
    return attrs;
};

JS2XML.prototype.createIndent = function() {
    return '    '.repeat(this.indentLevel - 1);
};

module.exports = function(data) {
    return new JS2XML().refactData(data);
};
