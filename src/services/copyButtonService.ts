import * as vscode from 'vscode';
import type MarkdownIt from 'markdown-it';
import type { PluginSimple, Token } from 'markdown-it';

const CONFIG_SECTION = 'markdownCodeCopy';

/**
 * Copy button plugin for Markdown-It
 * @param md The Markdown-It instance
 */
const copyButtonPlugin: PluginSimple = (md: MarkdownIt) => {
    setCodeBlockRule(md);
    setInlineCodeBlockRule(md);
};

function setCodeBlockRule(md: MarkdownIt): void {

    // Handle code blocks
    const defaultCodeBlock = md.renderer.rules.fence || function (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: MarkdownIt.Renderer) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.fence = function (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: MarkdownIt.Renderer) {

        const defaultRender = defaultCodeBlock(tokens, idx, options, env, self);

        const enabled = vscode.workspace.getConfiguration(CONFIG_SECTION).get<boolean>('enableCodeBlockCopy', true);
        if (!enabled) {
            return defaultRender;
        }

        // Generate unique ID for the code block
        const codeBlockId = `code-block-${crypto.randomUUID()}`;

        // Create a wrapper with copy functionality
        const copyButton = `<button class="copy-button" data-code-block-id="${codeBlockId}" title="Copy code" aria-label="Copy code">Copy</button>`;
        return `<div class="code-block-wrapper" id="${codeBlockId}">${defaultRender}${copyButton}</div>`;
    };
}

function setInlineCodeBlockRule(md: MarkdownIt): void {
    // Handle inline code blocks
    const defaultCodeInline = md.renderer.rules.code_inline || function (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: MarkdownIt.Renderer) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.code_inline = function (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: MarkdownIt.Renderer) {

        const defaultRender = defaultCodeInline(tokens, idx, options, env, self);

        const enabled = vscode.workspace.getConfiguration(CONFIG_SECTION).get<boolean>('enableInlineCodeCopy', true);
        if (!enabled) {
            return defaultRender;
        }

        // Generate unique ID for the inline code block
        const inlineId = `inline-code-${crypto.randomUUID()}`;

        // Create a wrapper with copy functionality
        const copyButton = `<button class="copy-button-inline" data-inline-code-id="${inlineId}" title="Copy code" aria-label="Copy inline code">📋</button>`;
        return `<span class="inline-code-wrapper" id="${inlineId}">${defaultRender}${copyButton}</span>`;
    };
}

export default copyButtonPlugin;