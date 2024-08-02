module.exports = function (api) {
	api.cache(true);
	process.env.EXPO_ROUTER_APP_ROOT = "../../src/app/(tabs)";
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			["module:react-native-dotenv"],
			"react-native-reanimated/plugin"
		]
	};
};
