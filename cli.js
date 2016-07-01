#!/usr/bin/env node
var screencap = require('./dist/index.js').default;
var semafor = require('semafor');
var logger = semafor();
screencap(function(err, path) {
    if(err) logger.fail(err);
    else logger.ok(path);
});