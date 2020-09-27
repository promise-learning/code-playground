import { parse, print } from 'recast';

export const parseFiles = (files: any, entryPoint: string): string => {
	const ast = parse(files[entryPoint], {
		parser: require('recast/parsers/babylon'),
	});
	ast.program.body = ast.program.body.filter(
		(item: any) => item.type !== 'ImportDeclaration',
	);

	return print(ast).code;
};
