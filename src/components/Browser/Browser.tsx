import React from 'react';

interface BrowserProps {
	content: string;
}
const Browser = (props: BrowserProps) => {
	return (
		<iframe
			srcDoc={props.content}
			height="500"
			style={{
				width: '100%',
				border: '2px solid #dfdfdf',
				padding: 10,
				marginTop: 20,
			}}
		/>
	);
};

Browser.defaultProps = {
	content: '',
};

export default Browser;
