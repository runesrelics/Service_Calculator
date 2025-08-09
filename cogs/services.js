const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const skills = require('../data/skills.js');
const diaries = require('../data/diaries.js');

module.exports = {
    name: 'services',
    
    async handleCommand(interaction) {
        const categorySelect = new StringSelectMenuBuilder()
            .setCustomId('select_category')
            .setPlaceholder('Choose a service category')
            .addOptions([
                {
                    label: 'Skilling & Training',
                    description: 'Level up your skills with our training services',
                    value: 'skilling',
                    emoji: '📊'
                },
                {
                    label: 'Questing & Diaries',
                    description: 'Complete quests and achievement diaries',
                    value: 'questing',
                    emoji: '📜'
                },
                {
                    label: 'Minigames',
                    description: 'Unlock rewards from various minigames',
                    value: 'minigames',
                    emoji: '🎮'
                },
                {
                    label: 'Bossing & Raids',
                    description: 'Boss kills and raid completions',
                    value: 'bossing',
                    emoji: '⚔️'
                }
            ]);

        const row = new ActionRowBuilder().addComponents(categorySelect);

        await interaction.reply({
            files: ['./assets/banner.png'],
            components: [row]
        });
    },

    async handleCategorySelect(interaction) {
        const category = interaction.values[0];

        // Create fresh dropdown for updating the original message
        const freshCategorySelect = new StringSelectMenuBuilder()
            .setCustomId('select_category')
            .setPlaceholder('Choose a service category')
            .addOptions([
                {
                    label: 'Skilling & Training',
                    description: 'Level up your skills with our training services',
                    value: 'skilling',
                    emoji: '📊'
                },
                {
                    label: 'Questing & Diaries',
                    description: 'Complete quests and achievement diaries',
                    value: 'questing',
                    emoji: '📜'
                },
                {
                    label: 'Minigames',
                    description: 'Unlock rewards from various minigames',
                    value: 'minigames',
                    emoji: '🎮'
                },
                {
                    label: 'Bossing & Raids',
                    description: 'Boss kills and raid completions',
                    value: 'bossing',
                    emoji: '⚔️'
                }
            ]);

        const freshRow = new ActionRowBuilder().addComponents(freshCategorySelect);

        // Update the original message to reset the dropdown
        await interaction.update({
            files: ['./assets/banner.png'],
            components: [freshRow]
        });

        if (category === 'skilling') {
            await this.showSkillsMenu(interaction);
        } else if (category === 'questing') {
            await this.showQuestingMenu(interaction);
        } else if (category === 'minigames') {
            await this.showMinigamesMenu(interaction);
        } else if (category === 'bossing') {
            await this.showBossingMenu(interaction);
        }
    },

    async showQuestingMenu(interaction) {
        const questingEmbed = new EmbedBuilder()
            .setTitle('Runes & Relics - Questing & Diaries Services')
            .setDescription('Select a service type below to view available options.\n\n**Available Discounts:**\n• Eternal: 3% off\n• Relic: 5% off')
            .setColor('#0099ff');

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('questing_quests')
                    .setLabel('Quests')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('📜'),
                new ButtonBuilder()
                    .setCustomId('questing_diaries')
                    .setLabel('Achievement Diaries')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('🏆')
            );

        await interaction.followUp({
            embeds: [questingEmbed],
            components: [buttons],
            ephemeral: true
        });
    },

    async showQuestingModal(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('quest_modal')
            .setTitle('Quest Service Request');

        const questsInput = new TextInputBuilder()
            .setCustomId('quests_list')
            .setLabel('Enter the quests you want completed')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('List the quests you want completed (e.g., Dragon Slayer, Monkey Madness, etc.)')
            .setRequired(true)
            .setMaxLength(1000);

        const firstActionRow = new ActionRowBuilder().addComponents(questsInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    },

    async showMinigamesModal(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('minigames_modal')
            .setTitle('Minigames Service Request');

        const minigamesInput = new TextInputBuilder()
            .setCustomId('minigames_list')
            .setLabel('Enter the minigames you want completed')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('List the minigames you want completed (e.g., Pest Control, Barbarian Assault, etc.)')
            .setRequired(true)
            .setMaxLength(1000);

        const firstActionRow = new ActionRowBuilder().addComponents(minigamesInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    },

    async showBossingModal(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('bossing_modal')
            .setTitle('Bossing & Raids Service Request');

        const bossingInput = new TextInputBuilder()
            .setCustomId('bossing_list')
            .setLabel('Enter the bosses/raids you want completed')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('List the bosses or raids you want completed (e.g., Zulrah kills, Vorkath kills, etc.)')
            .setRequired(true)
            .setMaxLength(1000);

        const firstActionRow = new ActionRowBuilder().addComponents(bossingInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    },

    async showMinigamesMenu(interaction) {
        const minigamesEmbed = new EmbedBuilder()
            .setTitle('Runes & Relics - Minigames Services')
            .setDescription('Select a service type below to view available options.\n\n**Available Discounts:**\n• Eternal: 3% off\n• Relic: 5% off')
            .setColor('#0099ff');

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('minigames_request')
                    .setLabel('Request Minigames')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🎮')
            );

        await interaction.followUp({
            embeds: [minigamesEmbed],
            components: [buttons],
            ephemeral: true
        });
    },

    async showBossingMenu(interaction) {
        const bossingEmbed = new EmbedBuilder()
            .setTitle('Runes & Relics - Bossing & Raids Services')
            .setDescription('Select a service type below to view available options.\n\n**Available Discounts:**\n• Eternal: 3% off\n• Relic: 5% off')
            .setColor('#0099ff');

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bossing_request')
                    .setLabel('Request Bossing')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('⚔️')
            );

        await interaction.followUp({
            embeds: [bossingEmbed],
            components: [buttons],
            ephemeral: true
        });
    },

    async showDiariesMenu(interaction) {
        const diariesEmbed = new EmbedBuilder()
            .setTitle('Runes & Relics - Achievement Diaries')
            .setDescription('Select an achievement diary to view pricing and requirements.\n\n**Available Discounts:**\n• Eternal: 3% off\n• Relic: 5% off')
            .setColor('#0099ff');

        const diarySelect = new StringSelectMenuBuilder()
            .setCustomId('select_diary')
            .setPlaceholder('Choose an achievement diary')
            .addOptions([
                {
                    label: 'Ardougne Diary',
                    description: 'Ardougne achievement diary',
                    value: 'ardougne'
                },
                {
                    label: 'Desert Diary',
                    description: 'Desert achievement diary',
                    value: 'desert'
                },
                {
                    label: 'Falador Diary',
                    description: 'Falador achievement diary',
                    value: 'falador'
                },
                {
                    label: 'Fremmenik Diary',
                    description: 'Fremmenik achievement diary',
                    value: 'fremmenik'
                },
                {
                    label: 'Kandarin Diary',
                    description: 'Kandarin achievement diary',
                    value: 'kandarin'
                },
                {
                    label: 'Karamja Diary',
                    description: 'Karamja achievement diary',
                    value: 'karamja'
                },
                {
                    label: 'Kourend & Kebos Diary',
                    description: 'Kourend & Kebos achievement diary',
                    value: 'kourend'
                },
                {
                    label: 'Lumbridge & Draynor Diary',
                    description: 'Lumbridge & Draynor achievement diary',
                    value: 'lumbridge'
                },
                {
                    label: 'Morytania Diary',
                    description: 'Morytania achievement diary',
                    value: 'morytania'
                },
                {
                    label: 'Varrock Diary',
                    description: 'Varrock achievement diary',
                    value: 'varrock'
                },
                {
                    label: 'Western Prov. Diary',
                    description: 'Western Provinces achievement diary',
                    value: 'western'
                },
                {
                    label: 'Wilderness Diary',
                    description: 'Wilderness achievement diary',
                    value: 'wilderness'
                }
            ]);

        const row = new ActionRowBuilder().addComponents(diarySelect);

        await interaction.reply({
            embeds: [diariesEmbed],
            components: [row],
            ephemeral: true
        });
    },

    async showDiaryDetails(interaction, diaryKey) {
        const diary = diaries[diaryKey];
        if (!diary) {
            await interaction.reply({
                content: 'Diary not found.',
                ephemeral: true
            });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`${diary.icon} You have chosen ${diary.name}`)
            .setColor('#0099ff');

        let description = '';
        const difficulties = ['easy', 'medium', 'hard', 'elite'];
        
        difficulties.forEach(difficulty => {
            const diff = diary.difficulties[difficulty];
            const difficultyName = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
            description += `**${difficultyName}**: $${diff.price}\n`;
            
            if (diff.requirements && diff.requirements.length > 0) {
                diff.requirements.forEach(req => {
                    description += `- ${req}\n`;
                });
            }
            description += '\n';
        });

        embed.setDescription(description);

        // Create difficulty selection dropdown
        const difficultySelect = new StringSelectMenuBuilder()
            .setCustomId(`diary_difficulty_${diaryKey}`)
            .setPlaceholder('Select 1 or more difficulties')
            .setMinValues(1)
            .setMaxValues(4)
            .addOptions([
                {
                    label: 'Easy',
                    description: `$${diary.difficulties.easy.price}`,
                    value: 'easy'
                },
                {
                    label: 'Medium',
                    description: `$${diary.difficulties.medium.price}`,
                    value: 'medium'
                },
                {
                    label: 'Hard',
                    description: `$${diary.difficulties.hard.price}`,
                    value: 'hard'
                },
                {
                    label: 'Elite',
                    description: `$${diary.difficulties.elite.price}`,
                    value: 'elite'
                }
            ]);

        // Create Submit button
        const submitButton = new ButtonBuilder()
            .setCustomId(`diary_submit_${diaryKey}`)
            .setLabel('Submit Selection')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('✅');

        const row1 = new ActionRowBuilder().addComponents(difficultySelect);
        const row2 = new ActionRowBuilder().addComponents(submitButton);

        await interaction.reply({
            embeds: [embed],
            components: [row1, row2],
            ephemeral: true
        });
    },

    async showSkillsMenu(interaction) {
        const skillEmbed = new EmbedBuilder()
            .setTitle('Runes & Relics - Skilling Services')
            .setDescription('Select a skill below to calculate the cost of your desired training service.\n\n**Available Discounts:**\n• Eternal: 3% off\n• Relic: 5% off')
            .setColor('#0099ff');

        // First set of skills (combat & gathering)
        const firstSetSkills = [
            'attack', 'placeholder_hp', 'mining',
            'strength', 'agility', 'smithing',
            'defence', 'herblore', 'fishing',
            'ranged', 'thieving', 'cooking'
        ];

        // Second set of skills (production & support)
        const secondSetSkills = [
            'prayer', 'crafting', 'firemaking',
            'magic', 'fletching', 'woodcutting',
            'runecrafting', 'slayer', 'farming',
            'construction', 'hunter'
        ];

        // Create first set of buttons (4 rows of 3)
        const firstSetButtons = [];
        for (let i = 0; i < firstSetSkills.length; i += 3) {
            const row = new ActionRowBuilder();
            for (let j = 0; j < 3 && i + j < firstSetSkills.length; j++) {
                const skillName = firstSetSkills[i + j];
                const skill = skills[skillName];
                if (skill) {
                    const button = new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setCustomId(skillName === 'placeholder_hp' ? 'placeholder_button' : `skill_${skillName}`)
                        .setDisabled(skillName === 'placeholder_hp');
                    
                    // Set the emoji directly from skills.js
                    button.setEmoji(skill.emoji);
                    row.addComponents(button);
                }
            }
            firstSetButtons.push(row);
        }

        // Create second set of buttons (4 rows, last row has 2)
        const secondSetButtons = [];
        for (let i = 0; i < secondSetSkills.length; i += 3) {
            const row = new ActionRowBuilder();
            for (let j = 0; j < 3 && i + j < secondSetSkills.length; j++) {
                const skillName = secondSetSkills[i + j];
                const skill = skills[skillName];
                if (skill) {
                    const button = new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setCustomId(`skill_${skillName}`)
                        .setEmoji(skill.emoji);
                    row.addComponents(button);
                }
            }
            secondSetButtons.push(row);
        }

        // Send first set of skills
        await interaction.followUp({
            embeds: [skillEmbed],
            components: firstSetButtons,
            ephemeral: true
        });

        // Send second set of skills
        await interaction.followUp({
            components: secondSetButtons,
            ephemeral: true
        });
    }
};