module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ["airbnb-base"],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		quotes: [1, "double"],
		indent: [1, "tab"],
		semi: [1, "always"],
		"no-tabs": 0,
		"no-console": 0,
		"no-var": 0,
		"space-before-blocks": 0,
		"comma-dangle": [0, "never"],
		"no-underscore-dangle": 0,
		"no-unused-vars": [
			1,
			{ vars: "all", args: "after-used", ignoreRestSiblings: false },
		],
		"no-constant-condition": 1,
		"linebreak-style": [0, "windows"],
		"import/no-extraneous-dependencies": 0,
		"no-plusplus": 0,
	},
};
