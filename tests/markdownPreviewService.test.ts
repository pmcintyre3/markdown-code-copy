import * as assert from 'assert';
import * as vscode from 'vscode';
import { MarkdownPreviewService } from '../src/services/markdownPreviewService';

suite('MarkdownPreviewService', () => {
    let mockContext: vscode.ExtensionContext;

    setup(() => {
        mockContext = {
            subscriptions: [],
        } as unknown as vscode.ExtensionContext;
    });

    test('getConfig returns default values', () => {
        const service = new MarkdownPreviewService(mockContext);
        const config = service.getConfig();
        assert.strictEqual(config.buttonLabel, 'Copy');
        assert.strictEqual(config.successLabel, 'Copied!');
        assert.ok(config.successDurationMs > 0);
    });

    test('activate and dispose run without error', () => {
        const service = new MarkdownPreviewService(mockContext);
        assert.doesNotThrow(() => {
            service.activate();
            service.dispose();
        });
    });
});
