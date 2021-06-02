module.exports = {
    future: {
        webpack5: true,
    },
    webpack(config) {
        // import svg's as URLs and React components
        config.module.rules.push({
            test: /\.svg$/,
            exclude: /node_modules/,
            use: ['@svgr/webpack', 'url-loader'],
        });

        return config;
    },
};
