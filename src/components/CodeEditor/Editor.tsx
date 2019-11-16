import React, { Component, createRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { liftOff } from './token-config';

interface EditorProps {
	value: string;
	language: string;
	theme: string;
}

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
		const { language, theme, value } = this.props;
		if (node) {
			await liftOff(monaco);
			monaco.editor.create(node, { value, theme, language });
		}
	};
	render() {
		return <div style={{ height: '70vh' }} ref={this.editorRef} />;
	}
}

export default Editor;
