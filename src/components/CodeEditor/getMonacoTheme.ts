import Color from 'color';

const getCompatibleColor = (color: String) => {
	if (!color) {
		return color;
	}

	if (color.length === 7 || color.length === 9) {
		return color;
	}

	return new Color(color).hex();
};

const tokenizeStringRules = tokenColors =>
	tokenColors
		.filter(token => token.scope && token.settings)
		.reduce((acc, token) => {
			const tokenSettings = {
				foreground: getCompatibleColor(token.settings.foreground),
				background: getCompatibleColor(token.settings.background),
				fontStyle: token.settings.fontStyle,
			};
			if (typeof token.scope === 'string') {
				const allScopes = token.scope.split(',');

				const allRules = allScopes.map(item => ({
					token: item,
					...tokenSettings,
				}));

				return [...acc, ...allRules];
			}
			const allRules = token.scope.map(item => ({
				token: item,
				...tokenSettings,
			}));
			return [...acc, ...allRules];
		}, []);

export const getBase = (type: String) => {
	switch (type) {
		case 'dark':
			return 'vs-dark';
		case 'hc':
			return 'hc-black';
		default:
			return 'vs';
	}
};

export const getMonacoTheme = async themeName => {
	const theme = await import(`./themes/${themeName}.json`);
	const colors = theme.colors;
	const newColors = colors;
	Object.keys(colors).forEach(c => {
		if (newColors[c]) return c;

		delete newColors[c];

		return c;
	});

	const tokenizedRules = tokenizeStringRules(theme.tokenColors);

	return {
		base: getBase(theme.type),
		colors,
		rules: tokenizedRules,
	};
};
