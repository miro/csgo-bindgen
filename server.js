#!/usr/bin/env node

/**
	A tiny mock server for developing the CSGO binding generator frontend.
	
	Start server:
		node server.js
*/

var express = require('express');
var app = express();
var logger = require('morgan');

// Logs HTTP requests to console
app.use(logger("tiny"));

// Configure static file hosting middleware
app.use(express.static(__dirname + '/app'));

// Launch server
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
	console.log("Server running in port: " + port);
});

exports.server = server;
exports.app = app;
