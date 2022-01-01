<h1 align="center">
  <br>
    <img src="resources/banner.png" alt="logo" width="200">
  <br><br>
  Joi Akash for <a href="http://code.visualstudio.com">Visual Studio Code</a>
  <br>
  <br>
</h1>

<h3 align="center">An extension for running various types of programming languages.</h3>

<br>

<div align="center">

[![vscode](https://img.shields.io/badge/VS_Code-v1.62+-373277.svg?style=for-the-badge&logo=microsoft&logoColor=white&colorA=2b303b&colorB=7cb7ff)](https://code.visualstudio.com/updates/v1_62)  [![downloads](https://img.shields.io/visual-studio-marketplace/d/SohamMalakar.joiakash?style=for-the-badge&logo=docusign&logoColor=white&colorA=2b303b&colorB=96E072)](https://marketplace.visualstudio.com/items?itemName=SohamMalakar.joiakash)  [![rating](https://img.shields.io/visual-studio-marketplace/stars/SohamMalakar.joiakash?style=for-the-badge&logo=reverbnation&logoColor=white&colorA=2b303b&colorB=00e8c6)](https://marketplace.visualstudio.com/items?itemName=SohamMalakar.joiakash)

</div>

## Overview

This is a simple executor for programming languages with **command line arguments** support.

![overview](resources/overview.gif)

## Usage

- Click the status bar **Joi Akash** logo to run programs.
- Use the shortcut (**default**: `Ctrl+Alt+A`) to run the command.

Also, you can use the command palette (either with `F1` or `Ctrl+Shift+P`) and search for **Joi Akash**.

## Configuration

If you want to configure the commands that are being executed in the terminal follow these steps.

1. Go to your configuration file (**Settings** > **joi-akash-runner.executorMap** > **settings.json**).
2. At the end of the file, type **joi-akash-runner.executorMap** and hit enter.
3. Now, configure the command of your liking.

## Syntax

If you type these following keywords in the **joi-akash-runner.executorMap**, it will be replaced with the corresponding values.

| Keyword                      | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| **$fileName**                | Active document name.                                            |
| **$dir**                     | Directory containing the active document.                        |
| **$fileNameWithoutExt**      | Active document name without extension.                          |
| **$dirWithoutTrailingSlash** | Directory containing the active document without trailing slash. |
| **$tempArgs**                | Input string passed as arguments from the prompt.                |

## Known Issues

- The default configurations might cause problems with the older versions of powershell.

> **Note**: It's **NOT** a compiler or an interpreter of any kind. If you want to run programs with it, you should install the appropriate compiler or interpreter.

## Contribution

If you want to contribute to this extension, please open an issue on [GitHub](https://github.com/SohamMalakar/Joi-Akash/issues).
