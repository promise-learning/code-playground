import { loadWASM } from 'onigasm';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';

import cssGrammar from 'raw-loader!./tm-grammars/css.json.tmLanguage';
import htmlGrammar from 'raw-loader!./tm-grammars/html.json.tmLanguage';
import tsGrammar from 'raw-loader!./tm-grammars/TypeScriptReact.tmLanguage';

let grammarsLoaded = false;

export async function liftOff(monaco: any) {
	if (grammarsLoaded) {
		return;
	}
	grammarsLoaded = true;
	await loadWASM('/onigasm.wasm');

	const registry = new Registry({
		getGrammarDefinition: async scopeName => {
			if (scopeName === 'source.css') {
				return {
					format: 'json',
					content: cssGrammar,
				};
			}
			if (scopeName === 'text.html.basic') {
				return {
					format: 'json',
					content: htmlGrammar,
				};
			}

			return {
				format: 'plist',
				content: tsGrammar,
			};
		},
	});

	// map of monaco "language id's" to TextMate scopeNames
	const grammars = new Map();
	grammars.set('css', 'source.css');
	grammars.set('html', 'text.html.basic');
	grammars.set('typescript', 'source.tsx');
	grammars.set('javascript', 'source.js');

	await wireTmGrammars(monaco, registry, grammars);
}
