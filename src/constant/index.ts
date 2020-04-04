const defaultFiles = {
	'package.json': `
{
	"name": "my-project",
	"version": "1.0.0",
	"description": "React Project",
	"main": "src/index.js",
	"license": "ISC",
	"dependencies": {
		"react": "16.13.1",
		"react-dom": "16.13.1"
	}
}`,

	'src/MyComponent.js': `import React, { useState } from 'react';
const MyComponent = () => {
	const [name, setName] = useState('world');
	const handleChange = (e) => setName(e.target.value)

	return (
		<>
		<input type="text" onChange={handleChange}/>
		<h3>Hello {name}</h3>
		</>
	)
}
	`,

	'src/index.js': `import React from 'react';
import ReactDOM from 'react-dom';
const App = () => (
	<h1> Welcome to my app </h1>
)
ReactDOM.render(<App />, document.getElementById('root'));`,

	'public/index.html': `<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<meta name="msapplication-TileColor" content="#ffffff" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style>
		body {
			font-family: sans-serif;
		}
		</style>
		<title>Sandbox</title>
		%%SCRIPT%%
		<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

	</head>

	<body>
		<div id="root"></div>
		<script type="text/babel">
			%%DATA%%
		</script>
	</body>
</html>`,
};

export { defaultFiles };
