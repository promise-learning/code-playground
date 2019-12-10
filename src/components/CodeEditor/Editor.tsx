import React, { Component, createRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { liftOff } from './token-config';
import cobalt from './theme.json';
import saveFile from '../../apis/save-file';

interface EditorProps {
	value: string;
	language: string;
	theme: string;
	filePath: string;
	project: string;
}

interface EditorState {
	value: string;
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

class Editor extends Component<EditorProps, EditorState> {
	private editorRef = createRef<HTMLDivElement>();
	static defaultProps = {
		value: '',
		filePath: 'index.ts',
		project: 'sandbox',
		language: 'typescript',
		theme: 'vs-dark',
	};

	state = {
		value: this.props.value,
	};

	componentDidMount() {
		this.initEditor();
	}

	onValueChange = (value: string) => {
		this.setState({ value });
	};

	onSave = async () => {
		try {
			const { filePath, project } = this.props;
			const { value } = this.state;
			await saveFile(project, filePath, value);
		} catch (e) {
			console.error(e);
		}
	};

	initEditor = async () => {
		const self = this;
		const node = self.editorRef.current;
		const { language, value } = self.props;
		const colors = cobalt.colors;
		const newColors = colors;
		Object.keys(colors).forEach(c => {
			if (newColors[c]) return c;

			delete newColors[c];

			return c;
		});
		if (node) {
			const model = monaco.editor.createModel(value, language);
			const editor = monaco.editor.create(node, {
				value,
				language,
			});
			monaco.editor.defineTheme('myCustomTheme', {
				base: 'vs-dark',
				inherit: true,
				rules: tokenizeStringRules(cobalt.tokenColors),
				colors,
			});

			monaco.editor.setTheme('myCustomTheme');
			editor.setModel(model);
			model.onDidChangeContent(() => {
				this.onValueChange(model.getValue());
			});
			editor.addCommand(
				monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
				() => {
					self.onSave();
				},
			);
			await liftOff(monaco);
		}
	};

	render() {
		return <div style={{ height: '70vh' }} ref={this.editorRef} />;
	}
}

export default Editor;
