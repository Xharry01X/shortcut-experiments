const fs = require('fs');
const plist = require('plist');

/**
 * Create a shortcut file and save it as a .shortcut plist.
 * @param {Array} names - An array of names to include in the shortcut.
 * @param {string} fileName - The name of the file to save (without extension).
 */
function createShortcutFile(names, fileName) {
    // Create actions based on the names input
    const actions = names.map(name => ({
        type: "Show Result",
        parameters: {
            text: `Hello, ${name}!`
        }
    }));

    // Construct the JSON data for the shortcut
    const jsonData = {
        name: "Greeting Shortcut",
        actions: actions
    };

    // Convert JSON to plist format
    const plistString = plist.build(jsonData);

    // Write the plist string to a .shortcut file
    fs.writeFileSync(`${fileName}.shortcut`, plistString, 'utf8');
    console.log(`Shortcut file saved as ${fileName}.shortcut`);
}

// Example usage
const names = ["Alice", "Bob", "Charlie"]; // Replace with any names you want
createShortcutFile(names, 'GreetingShortcut');