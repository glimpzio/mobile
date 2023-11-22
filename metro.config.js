// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
    const {
        resolver: { sourceExts },
    } = getDefaultConfig(__dirname);
    return {
        resolver: {
            sourceExts: [...sourceExts, "mjs"],
        },
    };
})();
