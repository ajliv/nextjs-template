module.exports = () => ({
    onDemandEntries: {
        websocketPort: process.env.ON_DEMAND_ENTRIES_PORT,
    },
    webpack(webpackConfig) {
        webpackConfig.module.rules.push(
            // convert svg files to react components
            {
                test: /\.svg$/,
                loader: '@svgr/webpack',
            }
        );

        return webpackConfig;
    },
});
