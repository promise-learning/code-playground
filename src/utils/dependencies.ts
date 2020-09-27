const dependenciesPathMap: any = {
	react: '/umd/react.development.js',
	'react-dom': '/umd/react-dom.development.js',
};

export const getDependencies = (packageJson: any): string[] => {
	const { dependencies } = packageJson;
	const res: string[] = [];
	Object.keys(dependencies).forEach(dep => {
		res.push(
			`<script src="https://unpkg.com/${dep}@${encodeURIComponent(
				dependencies[dep],
			)}${dependenciesPathMap[dep]}" crossorigin></script>`,
		);
	});

	return res;
};
