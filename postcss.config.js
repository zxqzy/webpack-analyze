module.exports = {
    plugins: [
        require("postcss-preset-env")({
        stage: 0, // Use the latest CSS features, 0-4, 0 is the latest
        features: {
            "nesting-rules": true,
        },
        }),
    ],
}