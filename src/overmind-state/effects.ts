import { defaultFiles } from '../constant';

export const getData = () => {
	return new Promise(resolve => {
		resolve({
			files: defaultFiles,
			entryPoint: 'src/index.js',
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
