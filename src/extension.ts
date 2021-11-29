import { basename, extname } from 'path';
import * as vscode from 'vscode';
let myStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	
	const myCommandId = 'joiakash.run';

	context.subscriptions.push(vscode.commands.registerCommand(myCommandId, async () => {

		const editor = vscode.window.activeTextEditor;

		// Executor Map variables
		let fileName = "";
		let fileExt = "";
		let dir = "";
		let fileNameWithoutExt = "";
		let dirWithoutTrailingSlash = "";

		if (editor)
		{
			fileName = basename(editor.document.uri.fsPath);
			fileExt = extname(editor.document.fileName);
			fileNameWithoutExt = fileName.replace(fileExt, "");

			dir = editor.document.uri.fsPath.replace(fileName, "");
			dirWithoutTrailingSlash = dir.substring(0, dir.length - 1);
			
			dir = '"' + dir + '"';
			dirWithoutTrailingSlash = '"' + dirWithoutTrailingSlash + '"';
		}
		else
		{
			vscode.window.showErrorMessage("No code found or selected.");
			return;
		}

		let conf = vscode.workspace.getConfiguration("joi-akash-runner.executorMap");

		var languageId = editor.document.languageId;

		vscode.window.showInformationMessage("I guess it's " + languageId); // Detecting languages

		var cmd = conf.get<string>(languageId);

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

		cmd = JSON.stringify(cmd);
		cmd = cmd.substring(1, cmd.length - 1); // Removing the inverted commas from the start and from the end

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
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	myStatusBarItem.command = myCommandId;
	myStatusBarItem.text = "Joi Akash $(flame)";
	myStatusBarItem.show();

	context.subscriptions.push(myStatusBarItem);
}

export function deactivate() {}
