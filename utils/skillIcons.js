const { AttachmentBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

// Map of skill IDs to their icon file names
const skillIconMap = {
    'attack': 'attack.png',
    'hitpoints': 'hitpoints.png',
    'mining': 'mining.png',
    'strength': 'strength.png',
    'agility': 'agility.png',
    'smithing': 'smithing.png',
    'defence': 'defence.png',
    'herblore': 'herblore.png',
    'fishing': 'fishing.png',
    'ranged': 'ranged.png',
    'thieving': 'thieving.png',
    'cooking': 'cooking.png',
    'prayer': 'prayer.png',
    'crafting': 'crafting.png',
    'firemaking': 'firemaking.png',
    'magic': 'magic.png',
    'fletching': 'fletching.png',
    'woodcutting': 'woodcutting.png',
    'runecrafting': 'runecrafting.png',
    'slayer': 'slayer.png',
    'farming': 'farming.png',
    'construction': 'construction.png',
    'hunter': 'hunter.png'
};

function getSkillIcon(skillId) {
    const iconPath = path.join(__dirname, '..', 'assets', 'skill-icons', skillIconMap[skillId]);
    if (fs.existsSync(iconPath)) {
        return new AttachmentBuilder(iconPath, { name: skillIconMap[skillId] });
    }
    return null;
}

module.exports = { getSkillIcon };