const fs = require('fs');
const plist = require('plist');

/**
 * Create a shortcut file and save it as a .shortcut plist.
 * @param {Object} jsonData - The JSON data representing the shortcut.
 * @param {string} fileName - The name of the file to save (without extension).
 */
function createShortcutFile(jsonData, fileName) {
    // Convert JSON to plist format
    const plistString = plist.build(jsonData);
    
    // Write the plist string to a .shortcut file
    fs.writeFileSync(`${fileName}.shortcut`, plistString, 'utf8');
    console.log(`Shortcut file saved as ${fileName}.shortcut`);
}

// Example JSON data for the shortcut
const jsonData = {
    name: "My Shortcut",
    actions: [
        {
            type: "Get Latest Photos",
            parameters: {
                count: 5
            }
        },
        {
            type: "Show Result",
            parameters: {
                text: "Here are your latest photos!"
            }
        }
    ]
};

// Create the shortcut file
createShortcutFile(jsonData, 'MyShortcut');