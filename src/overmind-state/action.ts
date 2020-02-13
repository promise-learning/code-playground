import { AsyncAction } from 'overmind';
import { getParsedFilesAndFolders } from '../utils';

export const getData: AsyncAction = async ({ state, effects }) => {
	const data = await effects.getData();
	const appData = getParsedFilesAndFolders(Object.keys(data.files));
	state.data = {
		isLoading: false,
		...data,
	};
	state.app = appData;
	state.currentFile = data.entryPoint || '';
};

type SaveFileData = {
	fileName: string;
	content: string;
};

export const saveFile: AsyncAction<SaveFileData> = async (
	{ state },
	payload,
) => {
	// filename could be `src/index.ts`
	const { fileName, content } = payload;
	state.data = {
		...state.data,
		files: {
			...state.data.files,
			[fileName]: content,
		},
	};
};
