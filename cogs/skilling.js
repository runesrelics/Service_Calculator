const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { getDiscount, applyDiscount } = require('../utils/discounts.js');
const { createServiceTicket } = require('../utils/tickets.js');
const { getXpDifference } = require('../utils/xp.js');
const { formatGP } = require('../utils/format.js');
const skills = require('../data/skills.js');

module.exports = {
    name: 'skilling',
    
    // Handle skill button clicks
    async handleSkillSelection(interaction) {
        const skillName = interaction.customId.replace('skill_', '');
        const skill = skills[skillName];

        if (!skill) {
            await interaction.reply({
                content: 'Invalid skill selected.',
                ephemeral: true
            });
            return;
        }

        // Create service type selection embed
        const serviceTypeEmbed = new EmbedBuilder()
            .setTitle(`${skill.name} Training Service`)
            .setDescription('Please select your preferred service type:\n\n**By Hand**: Regular price\n**Botted**: 40% discount on total price')
            .setColor('#0099ff');

        // Create buttons for service type selection
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`service_hand_${skillName}`)
                    .setLabel('By Hand')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`service_bot_${skillName}`)
                    .setLabel('Botted')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({
            embeds: [serviceTypeEmbed],
            components: [buttons],
            ephemeral: true
        });
    },

    // Handle service type selection
    async handleServiceType(interaction) {
        const [_, serviceType, skillName] = interaction.customId.split('_');
        const skill = skills[skillName];

        // Create modal for level input
        const modal = new ModalBuilder()
            .setCustomId(`skill_modal_${serviceType}_${skillName}`)
            .setTitle(`${skill.name} Training Calculator`);

        const currentLevelInput = new TextInputBuilder()
            .setCustomId('current_level')
            .setLabel('Current Level (1-98)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your current level')
            .setRequired(true);

        const targetLevelInput = new TextInputBuilder()
            .setCustomId('target_level')
            .setLabel('Target Level (2-99)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Enter your target level')
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(currentLevelInput);
        const secondActionRow = new ActionRowBuilder().addComponents(targetLevelInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    },

    // Handle modal submit
    async handleModalSubmit(interaction) {
        const parts = interaction.customId.split('_');
        const serviceType = parts[2]; // 'hand' or 'bot'
        const skillName = parts[3]; // the skill name
        const skill = skills[skillName];

        const currentLevel = parseInt(interaction.fields.getTextInputValue('current_level'));
        const targetLevel = parseInt(interaction.fields.getTextInputValue('target_level'));

        // Validate levels
        if (isNaN(currentLevel) || isNaN(targetLevel) ||
            currentLevel < 1 || currentLevel > 98 ||
            targetLevel < 2 || targetLevel > 99 ||
            currentLevel >= targetLevel) {
            await interaction.reply({
                content: 'Please enter valid levels (current: 1-98, target: 2-99, target must be higher than current).',
                ephemeral: true
            });
            return;
        }

        try {
            // Calculate XP needed
            const xpNeeded = getXpDifference(currentLevel, targetLevel);
            let totalCost = xpNeeded * skill.usd_per_xp;
            
            // Apply bot discount if selected
            if (serviceType === 'bot') {
                totalCost *= 0.6; // Apply 40% discount
            }
            
            // Apply role-based discount
            const discountedCost = applyDiscount(totalCost, getDiscount(interaction.member));

            // Create embed with results
            const embed = new EmbedBuilder()
                .setTitle(`${skill.name} Training Calculator`)
                .setDescription(`Training from level ${currentLevel} to ${targetLevel}\nService Type: ${serviceType === 'bot' ? 'Botted (-40%)' : 'By Hand'}`)
                .setColor('#0099ff')
                .addFields(
                    { name: 'XP Required', value: xpNeeded.toLocaleString(), inline: true },
                    { name: 'Base USD/XP Rate', value: `$${(skill.usd_per_xp * 1000000).toFixed(2)} per million XP`, inline: true },
                    { name: 'Total Cost', value: `$${discountedCost.toFixed(2)} USD${getDiscount(interaction.member) ? ` (${(getDiscount(interaction.member) * 100).toFixed(0)}% role discount applied)` : ''}`, inline: false }
                );

            // Create buttons for ticket creation or cancellation
            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`create_ticket_${skillName}_${currentLevel}_${targetLevel}_${serviceType}_${discountedCost}`)
                        .setLabel('Open Ticket')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('cancel_ticket')
                        .setLabel('Cancel')
                        .setStyle(ButtonStyle.Secondary)
                );

            await interaction.reply({
                embeds: [embed],
                components: [buttons],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error calculating training costs:', error);
            await interaction.reply({
                content: 'An error occurred while calculating training costs. Please try again.',
                ephemeral: true
            });
        }
    },

    // Handle ticket creation
    async handleTicketCreation(interaction) {
        try {
            // Parse the custom ID correctly: create_ticket_skillName_currentLevel_targetLevel_serviceType_discountedCost
            const parts = interaction.customId.split('_');
            console.log('Custom ID parts:', parts); // Debug logging
            
            if (parts.length < 7) {
                console.error('Invalid custom ID format:', interaction.customId);
                await interaction.reply({
                    content: 'Invalid ticket format. Please try again.',
                    ephemeral: true
                });
                return;
            }
            
            const skillName = parts[2]; // Skip 'create' and 'ticket'
            const currentLevel = parts[3];
            const targetLevel = parts[4];
            const serviceType = parts[5];
            const discountedCost = parts[6];
            
            console.log('Parsed values:', { skillName, currentLevel, targetLevel, serviceType, discountedCost }); // Debug logging
            
            const skill = skills[skillName];

            if (!skill) {
                console.error('Skill not found:', skillName);
                await interaction.reply({
                    content: 'Invalid skill selected. Please try again.',
                    ephemeral: true
                });
                return;
            }

            // Create ticket content
            const ticketContent = {
                type: 'Skilling',
                skill: skill.name,
                details: `${skill.name} training from level ${currentLevel} to ${targetLevel}\nService Type: ${serviceType === 'bot' ? 'Botted' : 'By Hand'}`,
                price: parseFloat(discountedCost),
                discount: getDiscount(interaction.member)
            };

            await createServiceTicket(interaction, ticketContent);
        } catch (error) {
            console.error('Error creating skilling ticket:', error);
            await interaction.reply({
                content: 'An error occurred while creating your ticket. Please try again.',
                ephemeral: true
            });
        }
    }
};