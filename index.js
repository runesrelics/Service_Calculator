require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, REST, Routes } = require('discord.js');
const services = require('./cogs/services.js');
const skilling = require('./cogs/skilling.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

// Command definitions
const commands = [
    {
        name: 'services',
        description: 'Open the services calculator'
    },
    {
        name: 'disclaimer',
        description: 'Posts the service disclaimer with agree/disagree buttons (Admin/Moderator only)'
    },
    {
        name: 'closeticket',
        description: 'Closes a ticket, archives it, and sends transcript to user and staff channel'
    }
];

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // Deploy commands
    try {
        console.log('Started refreshing application (/) commands.');
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        
        // Try guild-specific first, fallback to global
        try {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands }
            );
            console.log('Successfully reloaded guild application (/) commands.');
        } catch (guildError) {
            console.log('Guild command deployment failed, trying global deployment...');
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );
            console.log('Successfully reloaded global application (/) commands.');
        }
    } catch (error) {
        console.error('Error deploying commands:', error);
    }
});

client.on('interactionCreate', async interaction => {
    try {
        // Handle /services command
        if (interaction.isCommand() && interaction.commandName === 'services') {
            await services.handleCommand(interaction);
            return;
        }

        // Handle /disclaimer command
        if (interaction.isCommand() && interaction.commandName === 'disclaimer') {
            const disclaimerCommand = require('./commands/disclaimer.js');
            await disclaimerCommand.execute(interaction);
            return;
        }

        // Handle /closeticket command
        if (interaction.isCommand() && interaction.commandName === 'closeticket') {
            const closeticketCommand = require('./commands/closeticket.js');
            await closeticketCommand.execute(interaction);
            return;
        }

        // Handle category selection
        if (interaction.isStringSelectMenu() && interaction.customId === 'select_category') {
            await services.handleCategorySelect(interaction);
            return;
        }

        // Handle questing buttons
        if (interaction.isButton() && interaction.customId === 'questing_quests') {
            await services.showQuestingModal(interaction);
            return;
        }

        if (interaction.isButton() && interaction.customId === 'questing_diaries') {
            await services.showDiariesMenu(interaction);
            return;
        }

        // Handle minigames and bossing buttons
        if (interaction.isButton() && interaction.customId === 'minigames_request') {
            await services.showMinigamesModal(interaction);
            return;
        }

        if (interaction.isButton() && interaction.customId === 'bossing_request') {
            await services.showBossingModal(interaction);
            return;
        }



        // Handle diary selection
        if (interaction.isStringSelectMenu() && interaction.customId === 'select_diary') {
            const selectedDiary = interaction.values[0];
            await services.showDiaryDetails(interaction, selectedDiary);
            return;
        }

        // Handle skill button clicks
        if (interaction.isButton() && interaction.customId.startsWith('skill_')) {
            await skilling.handleSkillSelection(interaction);
            return;
        }

        // Handle service type selection
        if (interaction.isButton() && (interaction.customId.startsWith('service_hand_') || interaction.customId.startsWith('service_bot_'))) {
            await skilling.handleServiceType(interaction);
            return;
        }

        // Handle skill modal submit
        if (interaction.isModalSubmit() && interaction.customId.startsWith('skill_modal_')) {
            await skilling.handleModalSubmit(interaction);
            return;
        }

        // Handle quest modal submit
        if (interaction.isModalSubmit() && interaction.customId === 'quest_modal') {
            const questsList = interaction.fields.getTextInputValue('quests_list');
            
            // Create summary embed
            const embed = new EmbedBuilder()
                .setTitle('📜 Quest Service Request - Summary')
                .setDescription('Please review your quest request below.')
                .setColor('#0099ff')
                .addFields(
                    { name: 'Quests Requested', value: questsList, inline: false }
                );

            // Create buttons for ticket creation or cancellation
            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`create_quest_ticket_${Buffer.from(questsList).toString('base64').substring(0, 20)}`)
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
            return;
        }

        // Handle minigames modal submit
        if (interaction.isModalSubmit() && interaction.customId === 'minigames_modal') {
            const minigamesList = interaction.fields.getTextInputValue('minigames_list');
            
            // Create summary embed
            const embed = new EmbedBuilder()
                .setTitle('🎮 Minigames Service Request - Summary')
                .setDescription('Please review your minigames request below.')
                .setColor('#0099ff')
                .addFields(
                    { name: 'Minigames Requested', value: minigamesList, inline: false }
                );

            // Create buttons for ticket creation or cancellation
            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`create_minigames_ticket_${Buffer.from(minigamesList).toString('base64').substring(0, 20)}`)
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
            return;
        }

        // Handle bossing modal submit
        if (interaction.isModalSubmit() && interaction.customId === 'bossing_modal') {
            const bossingList = interaction.fields.getTextInputValue('bossing_list');
            
            // Create summary embed
            const embed = new EmbedBuilder()
                .setTitle('⚔️ Bossing & Raids Service Request - Summary')
                .setDescription('Please review your bossing request below.')
                .setColor('#0099ff')
                .addFields(
                    { name: 'Bosses/Raids Requested', value: bossingList, inline: false }
                );

            // Create buttons for ticket creation or cancellation
            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`create_bossing_ticket_${Buffer.from(bossingList).toString('base64').substring(0, 20)}`)
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
            return;
        }

        // Handle diary modal submit
        if (interaction.isModalSubmit() && interaction.customId.startsWith('diary_modal_')) {
            const diaryKey = interaction.customId.replace('diary_modal_', '');
            const diary = require('./data/diaries.js')[diaryKey];
            const selection = interaction.client.diarySelections?.[interaction.user.id];
            
            if (diary && selection && selection.diaryKey === diaryKey) {
                const accountName = interaction.fields.getTextInputValue('account_name');
                const requirements = interaction.fields.getTextInputValue('requirements');
                
                let difficultyText = selection.difficulties.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
                
                // Create ticket content using the same format as skilling
                const ticketContent = {
                    type: 'Diary',
                    skill: diary.name,
                    details: `${diary.name} - ${difficultyText}\nAccount: ${accountName}\nRequirements: ${requirements || 'None provided'}`,
                    price: selection.totalPrice,
                    discount: 0 // No discount for diaries
                };

                // Use the same ticket creation function as skilling
                const { createServiceTicket } = require('./utils/tickets.js');
                await createServiceTicket(interaction, ticketContent);
                
                // Clear the selection
                delete interaction.client.diarySelections[interaction.user.id];
            }
            return;
        }

        // Handle ticket creation button
        if (interaction.isButton() && interaction.customId.startsWith('create_ticket_')) {
            await skilling.handleTicketCreation(interaction);
            return;
        }

        // Handle diary difficulty selection
        if (interaction.isStringSelectMenu() && interaction.customId.startsWith('diary_difficulty_')) {
            const diaryKey = interaction.customId.replace('diary_difficulty_', '');
            const selectedDifficulties = interaction.values;
            const diary = require('./data/diaries.js')[diaryKey];
            
            if (diary) {
                let totalPrice = 0;
                let totalReward = 0;
                let selectedText = [];
                
                selectedDifficulties.forEach(difficulty => {
                    const diff = diary.difficulties[difficulty];
                    totalPrice += diff.price;
                    totalReward += parseFloat(diff.reward.replace('M', ''));
                    selectedText.push(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}: $${diff.price} | ${diff.reward}`);
                });
                
                // Store the selection for the ticket creation
                interaction.client.diarySelections = interaction.client.diarySelections || {};
                interaction.client.diarySelections[interaction.user.id] = {
                    diaryKey,
                    difficulties: selectedDifficulties,
                    totalPrice,
                    totalReward: `${totalReward}M`
                };
                
                // Just acknowledge the selection without sending a message
                await interaction.deferUpdate();
            }
            return;
        }

        // Handle diary submit button
        if (interaction.isButton() && interaction.customId.startsWith('diary_submit_')) {
            console.log('Diary submit button clicked:', interaction.customId);
            const diaryKey = interaction.customId.replace('diary_submit_', '');
            console.log('Diary key:', diaryKey);
            const diary = require('./data/diaries.js')[diaryKey];
            
            if (diary) {
                console.log('Diary found:', diary.name);
                const selection = interaction.client.diarySelections?.[interaction.user.id];
                console.log('User selection:', selection);
                
                if (!selection || selection.diaryKey !== diaryKey) {
                    console.log('No selection found or wrong diary');
                    await interaction.reply({
                        content: 'Please select difficulty levels first before submitting.',
                        ephemeral: true
                    });
                    return;
                }
                
                console.log('Creating summary for diary:', diary.name);
                
                // Create summary embed like skilling system
                let difficultyText = selection.difficulties.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
                
                const embed = new EmbedBuilder()
                    .setTitle(`${diary.icon} ${diary.name} - Summary`)
                    .setDescription(`Selected difficulties: ${difficultyText}`)
                    .setColor('#0099ff')
                    .addFields(
                        { name: 'Total Price', value: `$${selection.totalPrice}`, inline: false }
                    );

                // Create buttons for ticket creation or cancellation
                const buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`create_diary_ticket_${diaryKey}_${selection.totalPrice}`)
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
            }
            return;
        }

        // Handle diary ticket creation (like skilling)
        if (interaction.isButton() && interaction.customId.startsWith('create_diary_ticket_')) {
            console.log('Diary ticket creation button clicked:', interaction.customId);
            const parts = interaction.customId.split('_');
            const diaryKey = parts[3];
            const totalPrice = parts[4];
            
            const diary = require('./data/diaries.js')[diaryKey];
            const selection = interaction.client.diarySelections?.[interaction.user.id];
            
            if (diary && selection && selection.diaryKey === diaryKey) {
                console.log('Creating ticket for diary:', diary.name);
                
                let difficultyText = selection.difficulties.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ');
                
                const ticketContent = {
                    type: 'Diary',
                    skill: diary.name,
                    details: `${diary.name} - ${difficultyText}\nTotal Reward: ${selection.totalReward}`,
                    price: parseInt(totalPrice),
                    discount: 0 // No discount for diaries
                };
                
                console.log('Ticket content:', ticketContent);

                // Use the same ticket creation function as skilling
                const { createServiceTicket } = require('./utils/tickets.js');
                console.log('About to create service ticket...');
                await createServiceTicket(interaction, ticketContent);
                console.log('Service ticket created successfully!');
                
                // Clear the selection
                delete interaction.client.diarySelections[interaction.user.id];
            }
            return;
        }

        // Handle quest ticket creation
        if (interaction.isButton() && interaction.customId.startsWith('create_quest_ticket_')) {
            console.log('Quest ticket creation button clicked:', interaction.customId);
            
            // Get the quests list from the custom ID (base64 encoded)
            const questsEncoded = interaction.customId.replace('create_quest_ticket_', '');
            const questsList = Buffer.from(questsEncoded + '==', 'base64').toString();
            
            const ticketContent = {
                type: 'Quests',
                skill: 'Quest Service',
                details: `Quests Requested:\n${questsList}`,
                price: 0, // No fixed price for quests
                discount: 0
            };
            
            console.log('Quest ticket content:', ticketContent);

            // Use the same ticket creation function
            const { createServiceTicket } = require('./utils/tickets.js');
            console.log('About to create quest service ticket...');
            await createServiceTicket(interaction, ticketContent);
            console.log('Quest service ticket created successfully!');
            return;
        }

        // Handle minigames ticket creation
        if (interaction.isButton() && interaction.customId.startsWith('create_minigames_ticket_')) {
            console.log('Minigames ticket creation button clicked:', interaction.customId);
            
            // Get the minigames list from the custom ID (base64 encoded)
            const minigamesEncoded = interaction.customId.replace('create_minigames_ticket_', '');
            const minigamesList = Buffer.from(minigamesEncoded + '==', 'base64').toString();
            
            const ticketContent = {
                type: 'Minigames',
                skill: 'Minigames Service',
                details: `Minigames Requested:\n${minigamesList}`,
                price: 0, // No fixed price for minigames
                discount: 0
            };
            
            console.log('Minigames ticket content:', ticketContent);

            // Use the same ticket creation function
            const { createServiceTicket } = require('./utils/tickets.js');
            console.log('About to create minigames service ticket...');
            await createServiceTicket(interaction, ticketContent);
            console.log('Minigames service ticket created successfully!');
            return;
        }

        // Handle bossing ticket creation
        if (interaction.isButton() && interaction.customId.startsWith('create_bossing_ticket_')) {
            console.log('Bossing ticket creation button clicked:', interaction.customId);
            
            // Get the bossing list from the custom ID (base64 encoded)
            const bossingEncoded = interaction.customId.replace('create_bossing_ticket_', '');
            const bossingList = Buffer.from(bossingEncoded + '==', 'base64').toString();
            
            const ticketContent = {
                type: 'Bossing',
                skill: 'Bossing & Raids Service',
                details: `Bosses/Raids Requested:\n${bossingList}`,
                price: 0, // No fixed price for bossing
                discount: 0
            };
            
            console.log('Bossing ticket content:', ticketContent);

            // Use the same ticket creation function
            const { createServiceTicket } = require('./utils/tickets.js');
            console.log('About to create bossing service ticket...');
            await createServiceTicket(interaction, ticketContent);
            console.log('Bossing service ticket created successfully!');
            return;
        }

        // Handle disclaimer agree button
        if (interaction.isButton() && interaction.customId === 'disclaimer_agree') {
            // Check if the user is the ticket creator (customer) by checking channel permissions
            const channel = interaction.channel;
            const userPermissions = channel.permissionOverwrites.cache.get(interaction.user.id);
            
            // Check if user has explicit permissions to view the channel (ticket creator)
            if (!userPermissions || !userPermissions.allow.has('ViewChannel')) {
                await interaction.reply({
                    content: 'Only the ticket creator can respond to this disclaimer.',
                    ephemeral: true
                });
                return;
            }
            
            // Disable the buttons
            const disabledAgreeButton = new ButtonBuilder()
                .setCustomId('disclaimer_agree')
                .setLabel('AGREE')
                .setStyle(ButtonStyle.Success)
                .setEmoji('✅')
                .setDisabled(true);
                
            const disabledDisagreeButton = new ButtonBuilder()
                .setCustomId('disclaimer_disagree')
                .setLabel('DISAGREE')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('❌')
                .setDisabled(true);
            
            const disabledButtonRow = new ActionRowBuilder().addComponents(disabledAgreeButton, disabledDisagreeButton);
            
            // Update the original message to disable buttons
            await interaction.update({
                components: [disabledButtonRow]
            });
            
            // Send follow-up message
            await interaction.followUp({
                content: `**${interaction.user} has AGREED to the service disclaimer.**`,
                ephemeral: false
            });
            return;
        }

        // Handle disclaimer disagree button
        if (interaction.isButton() && interaction.customId === 'disclaimer_disagree') {
            // Check if the user is the ticket creator (customer) by checking channel permissions
            const channel = interaction.channel;
            const userPermissions = channel.permissionOverwrites.cache.get(interaction.user.id);
            
            // Check if user has explicit permissions to view the channel (ticket creator)
            if (!userPermissions || !userPermissions.allow.has('ViewChannel')) {
                await interaction.reply({
                    content: 'Only the ticket creator can respond to this disclaimer.',
                    ephemeral: true
                });
                return;
            }
            
            // Disable the buttons
            const disabledAgreeButton = new ButtonBuilder()
                .setCustomId('disclaimer_agree')
                .setLabel('AGREE')
                .setStyle(ButtonStyle.Success)
                .setEmoji('✅')
                .setDisabled(true);
                
            const disabledDisagreeButton = new ButtonBuilder()
                .setCustomId('disclaimer_disagree')
                .setLabel('DISAGREE')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('❌')
                .setDisabled(true);
            
            const disabledButtonRow = new ActionRowBuilder().addComponents(disabledAgreeButton, disabledDisagreeButton);
            
            // Update the original message to disable buttons
            await interaction.update({
                components: [disabledButtonRow]
            });
            
            // Send follow-up message
            await interaction.followUp({
                content: `**${interaction.user} has DISAGREED to the service disclaimer.**`,
                ephemeral: false
            });
            return;
        }

        // Handle cancel button
        if (interaction.isButton() && interaction.customId === 'cancel_ticket') {
            await interaction.update({
                content: 'Calculator closed.',
                embeds: [],
                components: [],
                ephemeral: true
            });
            return;
        }

    } catch (error) {
        console.error('Error handling interaction:', error);
        try {
            // Check if interaction has already been replied to or deferred
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: 'An error occurred while processing your request. Please try again.',
                    ephemeral: true
                });
            } else {
                // If already replied, send a follow-up
                await interaction.followUp({
                    content: 'An error occurred while processing your request. Please try again.',
                    ephemeral: true
                });
            }
        } catch (replyError) {
            console.error('Error sending error reply:', replyError);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);