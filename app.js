const fs = require('fs');
const plist = require('plist');

// Define the data for the plist file, including Shortcuts actions
const data = {
  Title: 'Hello World',
  Message: 'This is a simple plist example in Node.js',
  Version: 1.0,
  WFWorkflowActions: [
    {
      WFWorkflowActionIdentifier: 'is.workflow.actions.showalert',
      WFWorkflowActionParameters: {
        WFAlertActionTitle: 'Alert',
        WFAlertActionMessage: 'This is an alert action from a shortcut.'
      }
    },
    {
      WFWorkflowActionIdentifier: 'is.workflow.actions.gettext',
      WFWorkflowActionParameters: {
        WFTextActionText: 'Hello from Shortcuts!'
      }
    }
  ],
  WFWorkflowClientRelease: '2.1.2',
  WFWorkflowClientVersion: '1000',
  WFWorkflowImportQuestions: [],
  WFWorkflowTypes: ['NCWidget', 'WatchKit', 'Normal'],
};

// Convert the JavaScript object to a plist format
const plistData = plist.build(data);

// Write the plist data to a file
fs.writeFileSync('hello_world.plist', plistData);

console.log('Plist file created: hello_worldIn.plist');
