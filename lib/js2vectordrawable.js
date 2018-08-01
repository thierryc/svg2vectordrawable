
const svgPathBounds = require('svg-path-bounds'); // https://www.npmjs.com/package/svg-path-bounds

let JS2XML = function() {
    this.width = 24;
    this.height = 24;
    this.indentLevel = 0;
    this.tagConvert = {
        'svg': 'vector',
        'g': 'group',
        'path': 'path',
        'rect': 'path',
        'circle': 'path',
        'polygon': 'path',
        'ellipse': 'path',
        'polyline': 'path',
        'line': 'path'
    };
    this.attrConvert = {
        'name': 'android:name',
        'id': 'android:name',
        // svg - vector
        'opacity': 'android:alpha',
        'width': 'android:width',
        'height': 'android:height',
        'viewportWidth': 'android:viewportWidth',
        'viewportHeight': 'android:viewportHeight',
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
    this.resXMLNS = 'xmlns:android="http://schemas.android.com/apk/res/android"';
    this.aaptXMLNS = 'xmlns:aapt="http://schemas.android.com/aapt"';
};

JS2XML.prototype.convert = function(data) {
    
    let xml = '';

    this.indentLevel ++;
    
    if (data.content) {
        data.content.forEach(item => {
            if (item.elem) {
                
                xml += this.createElement(item);
                
                // xml += item.elem;
            }
        }, this);
    }

    this.indentLevel --;
    
    return xml;
};

JS2XML.prototype.createElement = function(data) {
    
    if (data.isElem('svg')) {
        if (data.hasAttr('width') && data.hasAttr('height')) {
            this.width = data.attr('width').value;
            this.height = data.attr('height').value;
        }
        else {
            if (data.hasAttr('viewBox')) {
                let [x, y, w, h] = data.attr('viewBox').value.split(/\s*/);
                this.width = w;
                this.height = h;
            }
        }
    }
    
    console.log(this.width);

    if (data.isEmpty()) {
    //     let processedData = '';
    //     processedData += this.convert(data);
        console.log(this.indentLevel + '-------')
        console.log(data.elem);
        console.log(data.attrs);

        return this.indentLevel + data.elem;
    }
    else {
        let processedData = '';
        console.log(this.indentLevel + '-------')
        console.log(data.elem);
        console.log(data.attrs);

        processedData += this.convert(data);

        return this.indentLevel + data.elem + processedData;
    }
};

module.exports = function(data) {
    return new JS2XML().convert(data);
};