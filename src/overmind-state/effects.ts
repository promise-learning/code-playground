import { defaultFiles } from '../constant';

export const getData = () => {
	return new Promise(resolve => {
		resolve({
			files: defaultFiles,
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
