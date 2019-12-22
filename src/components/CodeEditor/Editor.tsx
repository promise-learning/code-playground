import React, { Component, createRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Select } from '@chakra-ui/core';

import { liftOff } from './token-config';
import saveFile from '../../apis/save-file';
import { getMonacoTheme } from './getMonacoTheme';

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
		loadingTheme: true,
		theme: 'cobalt',
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

	setLoadingTheme = () => {
		this.setState(prevState => ({
			loadingTheme: !prevState.loadingTheme,
		}));
	};

	initEditor = async () => {
		const self = this;
		const node = self.editorRef.current;
		const { language, value } = self.props;
		if (node) {
			const model = monaco.editor.createModel(value, language);
			const editor = monaco.editor.create(node, {
				value,
				language,
				minimap: {
					enabled: false,
				},
			});
			const theme = await getMonacoTheme('cobalt');
			monaco.editor.defineTheme('cobalt', {
				inherit: true,
				...theme,
			});

			monaco.editor.setTheme('cobalt');
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
			this.setLoadingTheme();
		}
	};

	setNewTheme = async themeName => {
		const theme = await getMonacoTheme(themeName);
		monaco.editor.defineTheme(themeName, {
			inherit: true,
			...theme,
		});

		monaco.editor.setTheme(themeName);
	};

	handleThemeSelect = e => {
		const theme = e.target.value;
		if (theme) {
			this.setState(
				{
					theme,
				},
				() => this.setNewTheme(theme),
			);
		}
	};

	render() {
		const { theme, loadingTheme } = this.state;
		return (
			<React.Fragment>
				<Select
					value={theme}
					placeholder="Select option"
					onChange={this.handleThemeSelect}
				>
					<option value="cobalt">Cobalt</option>
					<option value="dracula">Dracula</option>
					<option value="night-owl">Night Owl</option>
					<option value="shades-of-purple">Shades of Purple</option>
				</Select>
				{loadingTheme ? 'Applying theme' : null}
				<div style={{ height: '70vh' }} ref={this.editorRef} />
			</React.Fragment>
		);
	}
}

export default Editor;
