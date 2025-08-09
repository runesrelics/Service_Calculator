const fs = require('fs');
const path = require('path');

const skillIcons = {
    'attack': 'data:image/png;base64,...', // Base64 data from the first icon
    'strength': 'data:image/png;base64,...', // Add base64 data for each icon
    // ... add all other skill icons
};

const iconDir = path.join(__dirname, '..', 'assets', 'skill-icons');

// Create directory if it doesn't exist
if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir, { recursive: true });
}

// Save each icon
Object.entries(skillIcons).forEach(([skill, base64Data]) => {
    const iconPath = path.join(iconDir, `${skill}.png`);
    const base64Image = base64Data.split(';base64,').pop();
    fs.writeFileSync(iconPath, Buffer.from(base64Image, 'base64'));
    console.log(`Saved ${skill}.png`);
});