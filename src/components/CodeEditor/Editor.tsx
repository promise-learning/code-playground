import React, { Component, createRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { liftOff } from './token-config';
import monokai from './theme.json';

interface EditorProps {
	value: string;
	language: string;
	theme: string;
}

const tokenizeStringRules = tokenColors =>
	tokenColors
		.filter(token => token.scope && token.settings)
		.reduce((acc, token) => {
			const tokenSettings = {
				foreground: token.settings.foreground,
				background: token.settings.background,
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

class Editor extends Component<EditorProps> {
	private editorRef = createRef<HTMLDivElement>();
	static defaultProps = {
		value: '',
		language: 'javascript',
		theme: 'vs-dark',
	};

	componentDidMount() {
		this.initEditor();
	}

	initEditor = async () => {
		const node = this.editorRef.current;
		const { language, value } = this.props;
		const colors = monokai.colors;
		const newColors = colors;
		Object.keys(colors).forEach(c => {
			if (newColors[c]) return c;

			delete newColors[c];

			return c;
		});
		if (node) {
			await liftOff(monaco);
			monaco.editor.create(node, {
				value,
				language,
			});
			monaco.editor.defineTheme('myCustomTheme', {
				base: 'vs-dark',
				inherit: true,
				rules: tokenizeStringRules(monokai.tokenColors),
				colors,
			});

			monaco.editor.setTheme('myCustomTheme');
		}
	};

	render() {
		return <div style={{ height: '70vh' }} ref={this.editorRef} />;
	}
}

export default Editor;
