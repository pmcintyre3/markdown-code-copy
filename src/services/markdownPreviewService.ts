import * as vscode from 'vscode';
import { CopyButtonConfig, DEFAULT_CONFIG } from '../models/copyButtonConfig';

export class MarkdownPreviewService implements vscode.Disposable {
    private readonly disposables: vscode.Disposable[] = [];

    constructor(private readonly context: vscode.ExtensionContext) {}

    activate(): void {
        const configListener = vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('markdownCodeCopy')) {
                // Reserved for future: notify webview of config changes via message passing
            }
        });
        this.context.subscriptions.push(configListener);
        this.disposables.push(configListener);
    }

    getConfig(): CopyButtonConfig {
        const vsConfig = vscode.workspace.getConfiguration('markdownCodeCopy');
        return {
            buttonLabel: vsConfig.get('buttonLabel', DEFAULT_CONFIG.buttonLabel),
            successLabel: vsConfig.get('successLabel', DEFAULT_CONFIG.successLabel),
            successDurationMs: vsConfig.get('successDurationMs', DEFAULT_CONFIG.successDurationMs),
        };
    }

    dispose(): void {
        this.disposables.forEach(d => d.dispose());
    }
}
