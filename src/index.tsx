import React from 'react';
import ReactDOM from 'react-dom';

import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import App from './pages';

import { overmindConfig } from './overmind';

const value = createOvermind(overmindConfig, {
	devtools: 'localhost:3031',
});

ReactDOM.render(
	<Provider value={value}>
		<ThemeProvider>
			<CSSReset />
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root'),
);
