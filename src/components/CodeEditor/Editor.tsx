import React, { createRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Select } from '@chakra-ui/core';

import { liftOff } from './token-config';
import { useOvermind } from '../../overmind-state';
import { getMonacoTheme } from './getMonacoTheme';

interface EditorProps {
	value: string;
	language: string;
	theme: string;
	filePath: string;
	project: string;
}

const Editor = (props: EditorProps) => {
	const [theme, setTheme] = useState('cobalt');
	const editorRef = createRef<HTMLDivElement>();
	const { actions, state } = useOvermind();
	useEffect(() => {
		const init = async () => {
			const node = editorRef.current;

			const { language, value } = props;
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
				editor.addCommand(
					monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
					() => {
						onSave(model.getValue());
					},
				);
				await liftOff(monaco);
			}
		};
		init();
	}, [props.value, props.language]);

	const setNewTheme = async themeName => {
		setTheme(themeName);
		const theme = await getMonacoTheme(themeName);
		monaco.editor.defineTheme(themeName, {
			inherit: true,
			...theme,
		});
		monaco.editor.setTheme(themeName);
	};

	const handleThemeSelect = e => {
		const theme = e.target.value;
		if (theme) {
			setNewTheme(theme);
		}
	};

	const onSave = async (content: string) => {
		try {
			const { filePath } = props;
			await actions.saveFile({
				fileName: filePath,
				content,
			});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<React.Fragment>
			<Select
				value={theme}
				placeholder="Select option"
				onChange={handleThemeSelect}
			>
				<option value="cobalt">Cobalt</option>
				<option value="dracula">Dracula</option>
				<option value="night-owl">Night Owl</option>
				<option value="shades-of-purple">Shades of Purple</option>
			</Select>
			<div style={{ height: '70vh' }} ref={editorRef} />
		</React.Fragment>
	);
};

Editor.defaultProps = {
	language: 'typescript',
	value: '',
	filePath: 'src/index.ts',
};

export default Editor;
