// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { fdatasyncSync } from 'fs';
import { basename, extname } from 'path';
// import path = require('path');
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "test" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('joiakash.run', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from test!');

		const editor = vscode.window.activeTextEditor;

		// Executor Map variables
		let fileName = "";
		let fileExt = "";
		let dir = "";
		let fileNameWithoutExt = "";
		let dirWithoutTrailingSlash = "";

		// console.log(editor?.document.languageId);

		if (editor)
		{
			fileName = basename(editor.document.uri.fsPath);
			// console.log(fileName);

			fileExt = extname(editor.document.fileName);
			// console.log(fileExt);

			fileNameWithoutExt = fileName.replace(fileExt, "");
			// console.log(fileNameWithoutExt);

			dir = editor.document.uri.fsPath.replace(fileName, "");
			
			dirWithoutTrailingSlash = dir.substring(0, dir.length - 1);
			
			dir = '"' + dir + '"';
			dirWithoutTrailingSlash = '"' + dirWithoutTrailingSlash + '"';

			// console.log(dir);
			// console.log(dirWithoutTrailingSlash);

			/*
			if(vscode.workspace.workspaceFolders !== undefined) {
				let wf = vscode.workspace.workspaceFolders[0].uri.path;
				let f = vscode.workspace.workspaceFolders[0].uri.fsPath;

				console.log(wf);
				console.log(f);
			}
			*/
		}
		else
		{
			vscode.window.showErrorMessage("No code found or selected.");
			return;
		}

		// console.log(fileExt);

		let conf = vscode.workspace.getConfiguration("joi-akash-runner.executorMap");

		var languageId = editor.document.languageId;

		vscode.window.showInformationMessage("I guess it's " + languageId); // Detecting languages

		var cmd = conf.get<string>(languageId);

		// vscode.window.showInformationMessage("Ahhhhhh!! Ar parina, Joi Akash!!");

		/*
		// Detecting languages
		if (fileExt === ".sh" || fileExt === ".bash")
		{
			vscode.window.showInformationMessage("I guess it's a Shell Script.");
			
			cmd = conf.get<string>("shellscript");
		}
		else if (fileExt === ".c")
		{
			vscode.window.showInformationMessage("I guess it's C.");
			
			cmd = conf.get<string>("c");
		}
		else if (fileExt === ".cpp")
		{
			vscode.window.showInformationMessage("I guess it's C++.");
			
			cmd = conf.get<string>("cpp");
		}
		else if (fileExt === ".java")
		{
			vscode.window.showInformationMessage("I guess it's Java.");
			
			cmd = conf.get<string>("java");
		}
		else if (fileExt === ".py")
		{
			vscode.window.showInformationMessage("I guess it's Python.");
			
			cmd = conf.get<string>("python");
		}
		else
		{
			vscode.window.showInformationMessage("Ar parina, Joi Akash!!");
			return;
		}
		*/

		// Prompting the user for command line arguments
		var tempArgs = await vscode.window.showInputBox({placeHolder: 'Program Args'});

		// Canceling the task
		if (tempArgs === undefined)
		{
			vscode.window.showInformationMessage("Ahhhhhh!! Ar parina, Joi Akash!! Task cancelled.");
			return;
		}

		tempArgs = JSON.stringify(tempArgs);
		tempArgs = tempArgs.substring(1, tempArgs.length - 1); // Removing the inverted commas from the start and from the end
		// console.log(tempArgs);

		cmd = JSON.stringify(cmd);
		cmd = cmd.substring(1, cmd.length - 1); // Removing the inverted commas from the start and from the end

		// console.log(cmd);

		// console.log(JSON.stringify(cmd) + " " + JSON.stringify(temp_args));

		// Replace the variables
		while (cmd.includes("$dir"))
		{
			cmd = cmd.replace("$dir", dir);
		}
		
		while (cmd.includes("$fileNameWithoutExt"))
		{
			cmd = cmd.replace("$fileNameWithoutExt", fileNameWithoutExt);
		}

		while (cmd.includes("$fileName"))
		{
			cmd = cmd.replace("$fileName", fileName);
		}

		while (cmd.includes("$tempArgs"))
		{
			cmd = cmd.replace("$tempArgs", tempArgs);
		}

		while (cmd.includes("$dirWithoutTrailingSlash"))
		{
			cmd = cmd.replace("$dirWithoutTrailingSlash", dirWithoutTrailingSlash);
		}

		// cmd = cmd.replace("$tempArgs", "");

		// console.log(cmd);

		// Create a terminal and run the commands

		let terms = vscode.window.terminals;

		var term = null;

		var termName = "Joi Akash";

		for (let t of terms) {
			if (t.name === termName) {
				term = t;
				break;
			}
		}

		if (term === null)
			term = vscode.window.createTerminal(termName);
		
		term.show();
		term.sendText(cmd);

		// term.sendText("");
		// console.log(vscode.workspace.getConfiguration("code-runner"));

		// Prompt the user for the program agruments
		// let temp_args = vscode.window.createInputBox();

		// Set the values into settings.json manually (DONT ASK USER TO DO THAT)

		// vscode.commands.executeCommand("code-runner.run");

		// term.sendText(temp_args);

		// testing
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
