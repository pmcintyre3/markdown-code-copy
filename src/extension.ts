import * as vscode from 'vscode';
import { MarkdownPreviewService } from './services/markdownPreviewService';

export function activate(context: vscode.ExtensionContext): void {
    const service = new MarkdownPreviewService(context);
    service.activate();
    context.subscriptions.push(service);
}

export function deactivate(): void {}
