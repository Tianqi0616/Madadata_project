module.exports = {
    entry: {bundle2: ["./utils.js", "./screener.js"]},
    output: {
        path: __dirname,
        filename: "[name].js"
    }
};
