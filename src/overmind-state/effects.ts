export const getData = () => {
	return new Promise(resolve => {
		resolve({
			files: {
				'src/index.ts': `console.log('hello world')\nconsole.log('foo bar')`,
				'src/components/index.ts': `console.log('component')`,
			},
			entryPoint: 'src/index.ts',
		});
	});
};

export const saveFile = (fileName: string, content: string) => {
	return new Promise(resolve => {
		localStorage.setItem(`${fileName}`, content);
		resolve({
			success: true,
		});
	});
};
