define(['curl/_privileged'], function (priv) {

	var core = priv.core;

	/**
	 * Returns the contextual functions for a given module: require,
	 * toAbsId, toUrl, etc.
	 * @param absId {String}
	 * @param callback {Function}
	 * @param errback {Function}
	 */
	return function (absId, parentCfg, callback, errback) {
		var pathInfo, ctx, config;
		// look up path info from parent module
		pathInfo = core.resolvePathInfo(absId, parentCfg);
		config = pathInfo.config;
		// create a new module context
		ctx = core.createContext(config, absId);
		callback({
			absId: absId,
			require: ctx.require,
			toAbsId: ctx.toAbsId,
			toUrl: ctx.require.toUrl,
			withExt: function (url) {
				return core.checkToAddJsExt(url, config);
			},
			config: function () { return config; }
		});
	};

});