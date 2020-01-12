import React, { useEffect } from 'react';
import CodeEditor from '../../components/CodeEditor';
import { useOvermind } from '../../overmind-state';

const Editor = () => {
	const {
		actions,
		state: {
			data: { isLoading, files },
			currentFile,
		},
	} = useOvermind();
	useEffect(() => {
		const init = async () => {
			await actions.getData();
		};
		init();
	}, []);
	return (
		<React.Fragment>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<CodeEditor value={files[currentFile]} filePath={currentFile} />
			)}
		</React.Fragment>
	);
};

export default Editor;
