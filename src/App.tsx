import React from 'react';
import {
	Badge,
	Flex,
	Avatar,
	Box,
	Text,
	ThemeProvider,
	CSSReset,
} from '@chakra-ui/core';

const App = () => (
	<ThemeProvider>
		<CSSReset />
		<Flex>
			<Avatar src="https://bit.ly/sage-adebayo" />
			<Box ml="3">
				<Flex alignItems="center">
					<Text fontWeight="bold">Segun Adebayo</Text>
					<Badge ml="1" variantColor="green">
						New
					</Badge>
				</Flex>
				<Text fontSize="sm">UI Engineer</Text>
			</Box>
		</Flex>
	</ThemeProvider>
);

export default App;
