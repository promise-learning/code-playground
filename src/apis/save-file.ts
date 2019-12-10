export default (projectName: string, fileName: string, content: string) => {
	return new Promise((resolve, reject) => {
		localStorage.setItem(`${projectName}.${fileName}`, content);
		resolve({
			success: true,
		});
	});
};
