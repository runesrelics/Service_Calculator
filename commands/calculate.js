const { SlashCommandBuilder } = require('discord.js');
const skills = require('../data/skills.js');

function calculatePrice(startLevel, endLevel, methodData) {
    let totalPrice = 0;
    let currentLevel = startLevel;

    for (const range of methodData) {
        const [minLevel, maxLevel] = range.range;
        if (currentLevel >= endLevel) break;
        
        if (currentLevel < maxLevel) {
            const levelEnd = Math.min(endLevel, maxLevel);
            const levelsInRange = levelEnd - currentLevel;
            totalPrice += levelsInRange * range.price;
            currentLevel = levelEnd;
        }
    }

    return totalPrice;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('Calculate the price for a skilling service')
        .addStringOption(option =>
            option.setName('skill')
                .setDescription('The skill you want to train')
                .setRequired(true)
                .addChoices(
                    { name: 'Attack', value: 'attack' },
                    { name: 'Agility', value: 'agility' }
                    // More skills can be added here
                ))
        .addIntegerOption(option =>
            option.setName('start_level')
                .setDescription('Your current level')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(98))
        .addIntegerOption(option =>
            option.setName('target_level')
                .setDescription('Your desired level')
                .setRequired(true)
                .setMinValue(2)
                .setMaxValue(99))
        .addStringOption(option =>
            option.setName('method')
                .setDescription('Training method')
                .setRequired(true)),

    async execute(interaction) {
        const skillName = interaction.options.getString('skill');
        const startLevel = interaction.options.getInteger('start_level');
        const targetLevel = interaction.options.getInteger('target_level');
        const methodChoice = interaction.options.getString('method');

        if (targetLevel <= startLevel) {
            return interaction.reply({
                content: 'Target level must be higher than starting level!',
                ephemeral: true
            });
        }

        const skill = skills[skillName];
        if (!skill) {
            return interaction.reply({
                content: 'Invalid skill selected!',
                ephemeral: true
            });
        }

        // Dynamically get available methods for the skill
        const methods = Object.entries(skill.methods);
        if (methods.length === 0) {
            return interaction.reply({
                content: 'No training methods available for this skill!',
                ephemeral: true
            });
        }

        const selectedMethod = skill.methods[methodChoice];
        if (!selectedMethod) {
            return interaction.reply({
                content: 'Invalid training method selected!',
                ephemeral: true
            });
        }

        const totalPrice = calculatePrice(startLevel, targetLevel, selectedMethod.levelRanges);

        let replyContent = `**${skill.name} Training Calculation**\n`;
        replyContent += `From Level ${startLevel} to ${targetLevel}\n`;
        replyContent += `Method: ${selectedMethod.name}\n`;
        replyContent += `Total Price: ${totalPrice.toFixed(2)} GP/XP\n`;

        if (selectedMethod.requirements) {
            replyContent += `\nRequirements: ${selectedMethod.requirements}`;
        }

        await interaction.reply(replyContent);
    },
};