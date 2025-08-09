const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'closeticket',
    description: 'Closes a ticket, archives it, and sends transcript to user and staff channel',
    defaultMemberPermissions: PermissionFlagsBits.ManageChannels,

    async execute(interaction) {
        try {
            // Check if this is a ticket channel
            const channel = interaction.channel;
            const channelName = channel.name.toLowerCase();
            
            // Check if this is a ticket channel (contains username-service format)
            if (!channelName.includes('-') || !channelName.match(/^[a-z0-9]+-[a-z]+$/)) {
                await interaction.reply({
                    content: 'This command can only be used in ticket channels.',
                    ephemeral: true
                });
                return;
            }

            // Check if user has permission to close tickets
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels) && 
                !interaction.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Moderator')) {
                await interaction.reply({
                    content: 'You do not have permission to close tickets.',
                    ephemeral: true
                });
                return;
            }

            // Get the ticket creator (user who has ViewChannel permission)
            const ticketCreator = channel.permissionOverwrites.cache.find(perm => 
                perm.allow.has('ViewChannel') && perm.id !== interaction.guild.id
            );

            if (!ticketCreator) {
                await interaction.reply({
                    content: 'Could not find the ticket creator.',
                    ephemeral: true
                });
                return;
            }

            // Defer the reply since this might take a while
            await interaction.deferReply();

            // Fetch all messages in the channel
            const messages = [];
            let lastId;
            
            try {
                while (true) {
                    const options = { limit: 100 };
                    if (lastId) {
                        options.before = lastId;
                    }
                    
                    const batch = await channel.messages.fetch(options);
                    if (batch.size === 0) break;
                    
                    messages.push(...batch.values());
                    lastId = batch.last().id;
                    
                    if (batch.size < 100) break;
                }

                // Sort messages by timestamp
                messages.reverse();
            } catch (error) {
                console.error('Error fetching messages:', error);
                // Continue with empty messages array
            }

            // Create transcript
            const transcript = createTranscript(messages, channel, interaction.guild);
            
            // Create transcript embed
            const transcriptEmbed = new EmbedBuilder()
                .setTitle(`📄 Ticket Transcript - ${channel.name}`)
                .setDescription(`Ticket closed by ${interaction.user.tag}`)
                .setColor('#ff6b6b')
                .addFields(
                    { name: 'Ticket Channel', value: channel.name, inline: true },
                    { name: 'Closed By', value: interaction.user.tag, inline: true },
                    { name: 'Closed At', value: new Date().toLocaleString(), inline: true },
                    { name: 'Total Messages', value: messages.length.toString(), inline: true }
                )
                .setTimestamp();

            // Send transcript to staff channel
            const staffChannel = interaction.guild.channels.cache.get('1395791949969231945');
            if (staffChannel) {
                try {
                    await staffChannel.send({
                        embeds: [transcriptEmbed],
                        files: [{
                            attachment: Buffer.from(transcript, 'utf8'),
                            name: `transcript-${channel.name}-${Date.now()}.txt`
                        }]
                    });
                } catch (error) {
                    console.error('Error sending transcript to staff channel:', error);
                }
            }

            // Send transcript to ticket creator via DM
            try {
                const user = await interaction.client.users.fetch(ticketCreator.id);
                if (user) {
                    const userEmbed = new EmbedBuilder()
                        .setTitle(`📄 Ticket Transcript - ${channel.name}`)
                        .setDescription('Your ticket has been closed. Here is a transcript of the conversation:')
                        .setColor('#0099ff')
                        .addFields(
                            { name: 'Ticket Channel', value: channel.name, inline: true },
                            { name: 'Closed By', value: interaction.user.tag, inline: true },
                            { name: 'Closed At', value: new Date().toLocaleString(), inline: true }
                        )
                        .setTimestamp();

                    await user.send({
                        embeds: [userEmbed],
                        files: [{
                            attachment: Buffer.from(transcript, 'utf8'),
                            name: `transcript-${channel.name}-${Date.now()}.txt`
                        }]
                    });
                }
            } catch (error) {
                console.error('Error sending transcript to user:', error);
                // Continue with closing the ticket even if DM fails
            }

            // Archive the channel (rename it to indicate it's closed)
            const archiveName = `closed-${channel.name}-${Date.now()}`;
            await channel.setName(archiveName);

            // Remove all permissions except for staff
            await channel.permissionOverwrites.set([
                {
                    id: interaction.guild.id,
                    deny: ['ViewChannel']
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                }
            ].concat(
                // Keep Admin and Moderator roles
                ['Admin', 'Moderator']
                    .map(roleName => {
                        const role = interaction.guild.roles.cache.find(r => r.name === roleName);
                        return role ? {
                            id: role.id,
                            allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                        } : null;
                    })
                    .filter(Boolean)
            ));

            // Send final message and close the channel
            const closeEmbed = new EmbedBuilder()
                .setTitle('🔒 Ticket Closed')
                .setDescription(`This ticket has been closed by ${interaction.user.tag}`)
                .setColor('#ff6b6b')
                .addFields(
                    { name: 'Transcript Sent', value: 'A transcript has been sent to the staff channel and the ticket creator.', inline: false },
                    { name: 'Channel Archived', value: `Channel renamed to: ${archiveName}`, inline: false }
                )
                .setTimestamp();

            await interaction.editReply({
                embeds: [closeEmbed]
            });

            // Wait 5 seconds then delete the channel
            setTimeout(async () => {
                try {
                    await channel.delete('Ticket closed by ' + interaction.user.tag);
                } catch (error) {
                    console.error('Error deleting channel:', error);
                }
            }, 5000);

        } catch (error) {
            console.error('Error closing ticket:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: 'An error occurred while closing the ticket. Please try again.',
                    ephemeral: true
                });
            } else {
                await interaction.editReply({
                    content: 'An error occurred while closing the ticket. Please try again.'
                });
            }
        }
    }
};

function createTranscript(messages, channel, guild) {
    let transcript = `Ticket Transcript - ${channel.name}\n`;
    transcript += `Guild: ${guild.name}\n`;
    transcript += `Created: ${channel.createdAt.toLocaleString()}\n`;
    transcript += `Closed: ${new Date().toLocaleString()}\n`;
    transcript += `Total Messages: ${messages.length}\n`;
    transcript += '='.repeat(50) + '\n\n';

    if (messages.length === 0) {
        transcript += 'No messages found in this ticket.\n';
    } else {
        messages.forEach(message => {
            const timestamp = message.createdAt.toLocaleString();
            const author = message.author.tag;
            const content = message.content || '[No text content]';
            
            transcript += `[${timestamp}] ${author}:\n${content}\n`;
            
            // Add attachments if any
            if (message.attachments.size > 0) {
                message.attachments.forEach(attachment => {
                    transcript += `[Attachment: ${attachment.name} - ${attachment.url}]\n`;
                });
            }
            
            // Add embeds if any
            if (message.embeds.length > 0) {
                message.embeds.forEach(embed => {
                    transcript += `[Embed: ${embed.title || 'No title'} - ${embed.description || 'No description'}]\n`;
                });
            }
            
            transcript += '\n';
        });
    }

    return transcript;
}
