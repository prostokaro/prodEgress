module.exports = {
    webpack: function (config, env) {
        config.resolve.fallback = {
            "path": require.resolve("path-browserify"),
        };
        return config;
    }
};
