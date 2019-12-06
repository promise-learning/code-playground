import { loadWASM } from 'onigasm';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';

let grammarsLoaded = false;

export async function liftOff(monaco: any) {
	await loadWASM('/onigasm.wasm');

	const registry = new Registry({
		getGrammarDefinition: async scopeName => {
			return {
				format: 'json',
				content: await (await fetch(
					`https://raw.githubusercontent.com/microsoft/vscode/master/extensions/javascript/syntaxes/JavaScript.tmLanguage.json`,
				)).text(),
			};
		},
	});

	// map of monaco "language id's" to TextMate scopeNames
	const grammars = new Map();
	grammars.set('javascript', 'source.js');

	await wireTmGrammars(monaco, registry, grammars);
}
