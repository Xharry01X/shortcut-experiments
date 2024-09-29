const plist = require('plist');
const fs = require('fs');

const shortcutData = {
  WFWorkflowActions: [
    {
      WFWorkflowActionIdentifier: 'is.workflow.actions.ask',
      WFWorkflowActionParameters: {
        WFAskActionPrompt: 'Enter the first number',
        WFInputType: 'Number'
      }
    },
    {
      WFWorkflowActionIdentifier: 'is.workflow.actions.ask',
      WFWorkflowActionParameters: {
        WFAskActionPrompt: 'Enter the second number',
        WFInputType: 'Number'
      }
    },
    {
      WFWorkflowActionIdentifier: 'is.workflow.actions.setvariable',
      WFWorkflowActionParameters: {
        WFVariableName: 'InputNumbers'
      }
    },
    {
      WFWorkflowActionIdentifier: 'is.workflow.actions.runjavascriptonwebpage',
      WFWorkflowActionParameters: {
        WFJavaScriptSource: `
          // Get input from previous action
          const input = args.shortcutParameter;

          // Parse input as JSON
          const numbers = JSON.parse(input);

          // Calculate sum
          const sum = numbers[0] + numbers[1];

          // Generate random numbers
          const randomNum1 = Math.floor(Math.random() * 100);
          const randomNum2 = Math.floor(Math.random() * 100);

          // Create result object
          const result = {
              sum: sum,
              randomNum1: randomNum1,
              randomNum2: randomNum2
          };

          // Return result as JSON string
          completion(JSON.stringify(result));
        `,
        WFInput: {
          Value: {
            Type: 'Variable',
            VariableName: 'InputNumbers'
          }
        }
      }
    },
    {
      WFWorkflowActionIdentifier: 'is.workflow.actions.showresult',
      WFWorkflowActionParameters: {
        Text: {
          Value: {
            string: 'Hello World! The sum is {{JavaScript Result.sum}}\nRandom number 1: {{JavaScript Result.randomNum1}}\nRandom number 2: {{JavaScript Result.randomNum2}}'
          }
        }
      }
    }
  ],
  WFWorkflowClientVersion: '1200',
  WFWorkflowClientRelease: '2.0',
  WFWorkflowIcon: {
    WFWorkflowIconStartColor: 4282601983,
    WFWorkflowIconGlyphNumber: 59511
  }
};

const plistXml = plist.build(shortcutData);
fs.writeFileSync('MyJavaScriptShortcut.shortcut', plistXml);

console.log('Shortcut file created: MyJavaScriptShortcut.shortcut');