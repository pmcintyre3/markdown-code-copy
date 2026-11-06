import * as vscode from 'vscode';
import MarkdownIt from 'markdown-it';
import copyButtonPlugin from './services/copyButtonService';

export function activate(context: vscode.ExtensionContext) {
    return {
        extendMarkdownIt(md: MarkdownIt): MarkdownIt {
            return md.use(copyButtonPlugin);
        }
    };
}

export function deactivate(): void {}
