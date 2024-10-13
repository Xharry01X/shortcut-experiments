const fs = require('fs');
const plist = require('plist');

const generateShortcut = (shortcutName) => {
  const shortcutData = {
    WFWorkflowActions: [
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.selectphoto',
        WFWorkflowActionParameters: {
          WFSelectPhotoActionPickMultiple: true
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.setvariable',
        WFWorkflowActionParameters: {
          WFVariableName: 'SelectedPhotos'
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.choosefrommenu',
        WFWorkflowActionParameters: {
          WFMenuItems: [
            'Vertical',
            'Horizontal'
          ],
          WFMenuPrompt: 'How do you want to combine the images?'
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.conditional',
        WFWorkflowActionParameters: {
          WFCondition: 'Equals',
          WFConditionalActionString: 'Vertical',
          GroupingIdentifier: 'A8F7EB19-E2C3-4B9B-9E05-4DA91F0D1A63',
          WFControlFlowMode: 0
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.image.combine',
        WFWorkflowActionParameters: {
          WFImageCombineDirection: 'Vertical'
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.conditional',
        WFWorkflowActionParameters: {
          GroupingIdentifier: 'A8F7EB19-E2C3-4B9B-9E05-4DA91F0D1A63',
          WFControlFlowMode: 1
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.image.combine',
        WFWorkflowActionParameters: {
          WFImageCombineDirection: 'Horizontal'
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.conditional',
        WFWorkflowActionParameters: {
          GroupingIdentifier: 'A8F7EB19-E2C3-4B9B-9E05-4DA91F0D1A63',
          WFControlFlowMode: 2
        }
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.savemedia',
        WFWorkflowActionParameters: {}
      },
      {
        WFWorkflowActionIdentifier: 'is.workflow.actions.showresult',
        WFWorkflowActionParameters: {
          Text: {
            Value: {
              string: 'Images combined and saved to your photo library!'
            }
          }
        }
      }
    ],
    WFWorkflowClientVersion: '1080.3',
    WFWorkflowIcon: {
      WFWorkflowIconStartColor: 4282601983,
      WFWorkflowIconGlyphNumber: 59481
    },
    WFWorkflowImportQuestions: [],
    WFWorkflowTypes: ['NCWidget', 'ActionExtension', 'QuickAction'],
    WFWorkflowInputContentItemClasses: [
      'WFAppStoreAppContentItem',
      'WFArticleContentItem',
      'WFContactContentItem',
      'WFDateContentItem',
      'WFEmailAddressContentItem',
      'WFGenericFileContentItem',
      'WFImageContentItem',
      'WFiTunesProductContentItem',
      'WFLocationContentItem',
      'WFDCMapsLinkContentItem',
      'WFAVAssetContentItem',
      'WFPDFContentItem',
      'WFPhoneNumberContentItem',
      'WFRichTextContentItem',
      'WFSafariWebPageContentItem',
      'WFStringContentItem',
      'WFURLContentItem'
    ]
  };

  return plist.build(shortcutData);
};

// Generate the shortcut content
const shortcutContent = generateShortcut("Combine Images");

// Save the shortcut to a file
const fileName = 'CombineImages.shortcut';
fs.writeFile(fileName, shortcutContent, (err) => {
  if (err) {
    console.error('Error writing shortcut file:', err);
  } else {
    console.log(`Shortcut saved as ${fileName}`);
  }
});