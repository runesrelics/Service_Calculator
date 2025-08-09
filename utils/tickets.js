// Function to format GP values
function formatGP(amount) {
    if (amount >= 1000000) {
        return `${Math.floor(amount / 1000000)}M`;
    } else if (amount >= 1000) {
        return `${Math.floor(amount / 1000)}K`;
    }
    return amount.toString();
}

async function createServiceTicket(interaction, content) {
    // Check if this function has already been called for this interaction
    if (interaction._ticketCreated) {
        console.log('Ticket already created for this interaction, skipping');
        return;
    }

    // Mark this interaction as having a ticket created
    interaction._ticketCreated = true;

    try {
        // Check if interaction has already been replied to
        if (interaction.replied || interaction.deferred) {
            console.log('Interaction already acknowledged in createServiceTicket, skipping ticket creation');
            return;
        }

        console.log('Creating ticket for:', content.type, content.skill);

        const guild = interaction.guild;
        
        // Try to find the tickets category by name if environment variable is not set
        let ticketsCategory = guild.channels.cache.get(process.env.TICKETS_CATEGORY_ID);
        
        if (!ticketsCategory) {
            // Try to find by name
            ticketsCategory = guild.channels.cache.find(channel => 
                channel.name.toLowerCase().includes('ticket') && 
                channel.type === 4 // Category type
            );
        }
        
        if (!ticketsCategory) {
            // If no category found, create a simple embed response instead
            const embed = {
                title: 'Service Request',
                color: 0x0099ff,
                fields: [
                    {
                        name: 'Service Type',
                        value: content.type,
                        inline: true
                    },
                    {
                        name: 'Customer',
                        value: interaction.user.toString(),
                        inline: true
                    },
                    {
                        name: 'Price',
                        value: content.type === 'Skilling' 
                            ? `$${content.price.toFixed(2)} USD${content.discount ? ` (${(content.discount * 100).toFixed(0)}% discount applied)` : ''}`
                            : `$${content.price.toFixed(2)} USD${content.discount ? ` (${(content.discount * 100).toFixed(0)}% discount applied)` : ''}`,
                        inline: true
                    },
                    {
                        name: 'Details',
                        value: content.details,
                        inline: false
                    }
                ],
                timestamp: new Date()
            };

            // Check if interaction has already been replied to
            if (!interaction.replied && !interaction.deferred) {
                try {
                    await interaction.reply({
                        content: '**Service Request Created!**\nA staff member will contact you shortly.',
                        embeds: [embed],
                        ephemeral: true
                    });
                } catch (replyError) {
                    console.error('Error replying to interaction:', replyError);
                }
            }
            return;
        }

        // Create ticket channel name
        const username = interaction.user.username.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        let serviceName = '';
        
        if (content.type === 'Skilling') {
            serviceName = content.skill || 'Skilling';
        } else if (content.type === 'Diary') {
            serviceName = 'Diaries';
        } else if (content.type === 'Quests') {
            serviceName = 'Quests';
        } else if (content.type === 'Minigames') {
            serviceName = 'Minigames';
        } else if (content.type === 'Bossing') {
            serviceName = 'Bossing';
        } else {
            serviceName = content.type;
        }
        
        const channelName = `${username}-${serviceName}`;

        // Create the channel
        const channel = await guild.channels.create({
            name: channelName,
            type: 0, // GUILD_TEXT
            parent: ticketsCategory,
            permissionOverwrites: [
                {
                    id: guild.id, // @everyone role
                    deny: ['ViewChannel']
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                }
            ].concat(
                // Add permissions for Admin and Moderator roles if they exist
                ['Admin', 'Moderator']
                    .map(roleName => {
                        const role = guild.roles.cache.find(r => r.name === roleName);
                        return role ? {
                            id: role.id,
                            allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                        } : null;
                    })
                    .filter(Boolean) // Remove null entries
            )
        });

        // Create ticket content embed
        const embed = {
            title: 'Service Request',
            color: 0x0099ff,
            fields: [
                {
                    name: 'Service Type',
                    value: content.type,
                    inline: true
                },
                {
                    name: 'Customer',
                    value: interaction.user.toString(),
                    inline: true
                },
                {
                    name: 'Price',
                    value: content.type === 'Skilling' 
                        ? `$${content.price.toFixed(2)} USD${content.discount ? ` (${(content.discount * 100).toFixed(0)}% discount applied)` : ''}`
                        : `$${content.price.toFixed(2)} USD${content.discount ? ` (${(content.discount * 100).toFixed(0)}% discount applied)` : ''}`,
                    inline: true
                },
                {
                    name: 'Details',
                    value: content.details,
                    inline: false
                }
            ],
            timestamp: new Date()
        };

        // Send the initial message in the ticket channel
        await channel.send({ embeds: [embed] });
        
        // Send the disclaimer message
        await channel.send('**PLEASE NOTE:** Prices may vary dependant on what service you require. We first need to gather more precise details before providing you with a final quote. All prices stated in the calculator are to be used as an approximate guide only.');

        // Send confirmation to user - only if interaction hasn't been acknowledged yet
        if (!interaction.replied && !interaction.deferred) {
            try {
                await interaction.reply({
                    content: `Your ticket has been created in ${channel}!`,
                    ephemeral: true
                });
            } catch (replyError) {
                console.error('Error replying to interaction:', replyError);
            }
        } else {
            // If interaction has already been acknowledged, just log success and don't try to reply
            console.log(`Ticket created successfully in ${channel.name} for user ${interaction.user.tag}`);
        }

    } catch (error) {
        console.error('Error creating ticket:', error);
        // Only try to reply if we haven't already
        if (!interaction.replied && !interaction.deferred) {
            try {
                await interaction.reply({
                    content: 'There was an error creating your ticket. Please try again or contact an administrator.',
                    ephemeral: true
                });
            } catch (replyError) {
                console.error('Error sending error reply:', replyError);
            }
        } else {
            // If interaction has already been acknowledged, just log the error
            console.error('Error creating ticket (interaction already acknowledged):', error);
        }
    }
}

module.exports = {
    createServiceTicket
};