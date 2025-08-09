require('dotenv').config();
const { REST, Routes } = require('discord.js');

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

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();