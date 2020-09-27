import React, { useEffect } from 'react';
import CodeEditor from '../../components/CodeEditor';
import Browser from '../../components/Browser';
import { useOvermind } from '../../overmind-state';
import { getDependencies } from '../../utils/dependencies';
import { parseFiles } from '../../utils/parse';

const Editor = () => {
	const {
		actions,
		state: {
			data: { isLoading, files, entryPoint },
			currentFile,
		},
	} = useOvermind();
	useEffect(() => {
		const init = async () => {
			await actions.getData();
		};
		init();
	}, []);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	// dependencies
	const packageJson = JSON.parse(files['package.json']);
	const dependencies = getDependencies(packageJson);
	// TODO change static file
	let htmlContent = files['public/index.html'];
	const transpiledCode = parseFiles(files, entryPoint);
	if (htmlContent) {
		htmlContent = htmlContent.replace(
			'%%SCRIPT%%',
			dependencies.join('\n'),
		);

		htmlContent = htmlContent.replace('%%DATA%%', transpiledCode);
	}
	return (
		<>
			<CodeEditor
				value={files[currentFile]}
				filePath={currentFile}
				language="javascript"
			/>
			{htmlContent && <Browser content={htmlContent} />}
		</>
	);
};

export default Editor;
