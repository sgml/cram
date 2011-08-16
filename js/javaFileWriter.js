var java;
define(function () {
"use strict";

	var files, writers;

	files = {};
	writers = {};

	function write (text, optChannelId) {
		var file, writer;
		optChannelId = optChannelId || 'default.js';
		file = files[optChannelId];
		if (!file) {
			file = files[optChannelId] = java.io.File(optChannelId);
		}
		writer = writers[optChannelId];
		if (!writer) {
			writer = writers[optChannelId] = java.io.FileWriter(file, false);
		}
		writer.write(text);
	}

	function getWriter (optChannelId) {
		// returns a write() function that has memoized its file Id
		return function (text) {
			return write(text, optChannelId);
		}
	}

	function closeWriter (optChannelId) {
		var writer;
		writer = writers[optChannelId];
		if (writer) {
			writer.close();
		}
	}

	function closeAll () {
		for (var p in writers) closeWriter(p);
	}

	return {
		getWriter: getWriter,
		closeWriter: closeWriter,
		closeAll: closeAll
	};


});
