import { createHook } from 'overmind-react';

import { state } from './state';
import * as actions from './action';
import * as effects from './effects';

export const useOvermind = createHook();

export const overmindConfig = {
	state,
	actions,
	effects,
};
