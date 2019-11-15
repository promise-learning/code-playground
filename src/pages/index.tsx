import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box } from '@chakra-ui/core';
import Editor from './Editor';

const App = () => {
	return (
		<Box w="100%" p={3}>
			<Router>
				<Switch>
					<Route exact path="/" component={Editor} />
				</Switch>
			</Router>
		</Box>
	);
};
export default App;
