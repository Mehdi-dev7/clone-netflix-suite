module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"react/react-in-jsx-scope": "off", // Désactiver si vous utilisez React 17+
		"no-unused-vars": "warn", // Avertir sur les variables non utilisées
		// Ajoutez d'autres règles selon vos besoins
	},
};
