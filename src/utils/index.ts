export const getParsedFilesAndFolders = (files: string[]) => {
	const findRootFolders = (path = '/') => {
		const rootFolders: Array<string> = [];
		files.forEach(file => {
			if (file.includes(path)) {
				const rootFolder: string =
					path === '/'
						? file.split('/')[0]
						: file.replace(path, '').split('/')[0];
				if (
					!rootFolder.includes('.') &&
					!rootFolders.includes(rootFolder)
				) {
					rootFolders.push(rootFolder);
				}
			}
		});

		return rootFolders;
	};

	const findRootFiles = (path: string) => {
		if (path === '/') {
			return files.filter(file => !file.includes('/'));
		}
		return files
			.filter(file => file.includes(path))
			.map(file => file.replace(path, '').split('/')[0])
			.filter(item => item.includes('.'));
	};

	let filesStructure = {};

	const traverseFoldersAndFiles = (path: string) => {
		const rootFolders = findRootFolders(path);
		const rootFiles = findRootFiles(path);
		filesStructure = {
			...filesStructure,
			[path]: {
				folders: rootFolders,
				files: rootFiles,
			},
		};
		if (rootFolders.length) {
			rootFolders.forEach(folder => {
				traverseFoldersAndFiles(
					path === '/' ? `${folder}/` : `${path}${folder}/`,
				);
			});
		}
	};

	traverseFoldersAndFiles('/');

	return filesStructure;
};
