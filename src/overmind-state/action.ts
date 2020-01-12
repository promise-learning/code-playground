import { AsyncAction } from 'overmind';

export const getData: AsyncAction = async ({ state, effects }) => {
	const data = await effects.getData();
	state.data = {
		isLoading: false,
		...data,
	};
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
