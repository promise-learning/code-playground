export type StateType = {
	title: string;
	data: {
		isLoading: boolean;
		files: any | null;
		entryPoint: string;
	};
	currentFile: string;
};

export const state: StateType = {
	title: 'My App',
	currentFile: '',
	data: {
		isLoading: true,
		entryPoint: '',
		files: {},
	},
};
