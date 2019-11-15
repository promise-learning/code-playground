import { state } from './state';
import { createHook } from 'overmind-react';

export const useOvermind = createHook();

export const overmindConfig = {
	state,
};
