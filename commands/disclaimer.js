const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: 'disclaimer',
    description: 'Posts the service disclaimer with agree/disagree buttons (Admin/Moderator only)',
    
    async execute(interaction) {
        // Check if user has Admin or Moderator role
        const hasPermission = interaction.member.roles.cache.some(role => 
            role.name === 'Admin' || role.name === 'Moderator'
        );
        
        if (!hasPermission) {
            await interaction.reply({
                content: 'You do not have permission to use this command. Only Admins and Moderators can post disclaimers.',
                ephemeral: true
            });
            return;
        }
        
        // Create the disclaimer embed
        const disclaimerEmbed = new EmbedBuilder()
            .setTitle('Runes & Relics Service Disclaimer')
            .setDescription(`By using any service offered by Runes & Relics, you acknowledge and agree to the following:

**You understand and accept that all services may involve the use of automated software ("botting").**

**You acknowledge that botting is against the official Old School RuneScape (OSRS) terms of service and carries the risk of temporary or permanent account bans.**

**Runes & Relics and its staff are not liable for any bans, mutes, or other penalties applied to your account as a result of our services.**

**While we may, at our discretion, discuss and agree upon partial or full compensation in certain circumstances, this is not guaranteed and will be handled on a case-by-case basis.**

**By proceeding with any service, you confirm you have read, understood, and accepted this disclaimer in full.**`)
            .setColor('#ff6b6b')
            .setTimestamp();
        
        // Create AGREE and DISAGREE buttons
        const agreeButton = new ButtonBuilder()
            .setCustomId('disclaimer_agree')
            .setLabel('AGREE')
            .setStyle(ButtonStyle.Success)
            .setEmoji('✅');
            
        const disagreeButton = new ButtonBuilder()
            .setCustomId('disclaimer_disagree')
            .setLabel('DISAGREE')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('❌');
        
        const buttonRow = new ActionRowBuilder().addComponents(agreeButton, disagreeButton);
        
        // Post the disclaimer (not ephemeral)
        await interaction.reply({
            embeds: [disclaimerEmbed],
            components: [buttonRow]
        });
    }
};
