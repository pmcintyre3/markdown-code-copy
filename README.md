# Markdown Code Copy

A VS Code extension that adds copy buttons to code in the built-in Markdown preview.

## Features

- **Code blocks** — a copy button on every fenced code block in the Markdown preview.
- **Inline code** — a copy button on inline code spans, so you can grab a single command or identifier.

## Installation

This extension is not yet on the Visual Studio Marketplace. To install it:

1. Download the latest `.vsix` from the [Releases page](https://github.com/pmcintyre3/markdown-code-copy/releases).
2. In VS Code, open the Extensions view, click the `…` menu, and choose **Install from VSIX…**

   Or from a terminal:

   ```sh
   code --install-extension markdown-code-copy-<version>.vsix
   ```

## Extension Settings

| Setting | Default | Description |
| --- | --- | --- |
| `markdownCodeCopy.enableCodeBlockCopy` | `true` | Show a copy button on fenced code blocks in the Markdown preview. |
| `markdownCodeCopy.enableInlineCodeCopy` | `true` | Show a copy button on inline code spans in the Markdown preview. |

## Requirements

VS Code 1.102.0 or later.

## Releasing

Releases are built by GitHub Actions when a version tag is pushed:

```sh
npm version patch   # or minor / major — bumps package.json and creates the tag
git push --follow-tags
```

The workflow packages the extension with `vsce` and attaches the `.vsix` to a new GitHub Release.

## License

See [LICENSE](LICENSE).
