# Joi Akash
An extension for running various types of programming languages.

## Overview
This is a simple executor for programming languages with **command line arguments** support.

### Usage
- Use the shortcut (**default**: `Ctrl+Alt+A`) to run the command.

Also, you can use the command palette (either with `F1` or `Ctrl+Shift+P`) and search for `Joi Akash`.

### Configuration
If you want to configure the commands that are being executed in the terminal follow these steps.

1. Go to your configuration file (**Settings** (`Ctrl+,`) > **joi-akash-runner.executorMap** > **settings.json**).
2. At the end of the file, type **joi-akash-runner.executorMap** and hit enter.
3. Now, configure the command of your liking.

### Syntax

If you type these following keywords in the **joi-akash-runner.executorMap**, it will be replaced with the corresponding values.

- **$fileName**: Active document name.
- **$dir**: Directory containing the active document.
- **$fileNameWithoutExt**: Active document name without extension.
- **$dirWithoutTrailingSlash**: Directory containing the active document without trailing slash.
- **$tempArgs**: Input string passed as arguments from the prompt.

## Contribuion
If you want to contribute to this extension, please open an issue on [GitHub](https://github.com/SohamMalakar/Joi-Akash/issues).
