import { basename, extname } from 'path';
import * as vscode from 'vscode';
let myStatusBarItem: vscode.StatusBarItem;

function replaceAllFromAString(str: string, find: string, replace: string): string
{
	while (str.includes(find))
		str = str.replace(find, replace);

	return str;
}

export function activate(context: vscode.ExtensionContext)
{
	const myCommandId = 'joiakash.run';
	
	let joi = vscode.workspace.getConfiguration("joi-akash-runner");
	let troll = joi.get<boolean>("troll");

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
			vscode.window.showErrorMessage("No code found.");
			return;
		}
		

		let conf = vscode.workspace.getConfiguration("joi-akash-runner.executorMap");

		var languageId = editor.document.languageId;

		if (troll)
			vscode.window.showInformationMessage("Akashdip predicts it's " + languageId); // Detecting languages

		var cmd = conf.get<string>(languageId);

		if (cmd === undefined)
		{
			vscode.window.showInformationMessage("To run it, you have to define it in the configuration.");
			return;
		}

		let isPrompt = joi.get<boolean>("commandLineArguments");

		// Prompting the user for command line arguments
		var tempArgs = isPrompt? await vscode.window.showInputBox({placeHolder: 'Program Args'}) : "";

		// Canceling the task
		if (tempArgs === undefined)
		{
			if (troll)
				vscode.window.showInformationMessage("Ahhhhhh!! Ar parina, Joi Akash!! Task cancelled.");
			else	
				vscode.window.showInformationMessage("Task cancelled.");
			return;
		}

		// Replace the variables
		cmd = replaceAllFromAString(cmd, "$dirWithoutTrailingSlash", dirWithoutTrailingSlash);
		cmd = replaceAllFromAString(cmd, "$dir", dir);
		cmd = replaceAllFromAString(cmd, "$fileNameWithoutExt", fileNameWithoutExt);
		cmd = replaceAllFromAString(cmd, "$fileName", fileName);
		cmd = replaceAllFromAString(cmd, "$tempArgs", tempArgs);
		
		let terms = vscode.window.terminals;

		var term = null;

		var termName = "Joi Akash";

		for (let t of terms)
		{
			if (t.name === termName)
			{
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
	myStatusBarItem.text = troll? "Joi Akash $(flame)" : "Run $(play-circle)";
	myStatusBarItem.show();
	myStatusBarItem.tooltip = "Run Code";
	
	context.subscriptions.push(myStatusBarItem);
}

export function deactivate() {}
