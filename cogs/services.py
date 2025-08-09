from discord.ext import commands
from discord import app_commands
import discord
from data.skills import skills

class Services(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @app_commands.command(name="services")
    async def services(self, interaction: discord.Interaction):
        """Open the services calculator"""
        embed = discord.Embed(
            title='Runes & Relics Service Calculator',
            description='Welcome to the Runes & Relics Service Calculator!\n\nSelect a category below to view available services.\n\n**Available Discounts:**\n• Zenyte: 2% off\n• Eternal: 3% off\n• Relic: 5% off',
            color=discord.Color.blue()
        )
        embed.set_footer(text='Choose a category to begin')

        # Create the category selection dropdown
        select = discord.ui.Select(
            custom_id='select_category',
            placeholder='Choose a service category',
            options=[
                discord.SelectOption(
                    label='Skilling & Training',
                    description='Level up your skills with our training services',
                    value='skilling',
                    emoji='📊'
                ),
                discord.SelectOption(
                    label='Questing & Diaries',
                    description='Complete quests and achievement diaries',
                    value='questing',
                    emoji='📜'
                ),
                discord.SelectOption(
                    label='Minigames',
                    description='Unlock rewards from various minigames',
                    value='minigames',
                    emoji='🎮'
                ),
                discord.SelectOption(
                    label='Bossing & Raids',
                    description='Boss kills and raid completions',
                    value='bossing',
                    emoji='⚔️'
                )
            ]
        )

        await interaction.response.send_message(
            embed=embed,
            components=[discord.ui.ActionRow(select)]
        )

    @commands.Cog.listener()
    async def on_interaction(self, interaction: discord.Interaction):
        """Handle interactions with the services menu"""
        if not interaction.data:
            return

        if interaction.data.get("custom_id") == "select_category":
            category = interaction.data["values"][0]

            # Reset the dropdown
            await self.services(interaction)

            if category == "skilling":
                await self.show_skills_menu(interaction)
            elif category in ["questing", "minigames", "bossing"]:
                await interaction.followup.send(
                    content=f"{category.title()} services coming soon!",
                    ephemeral=True
                )

    async def show_skills_menu(self, interaction: discord.Interaction):
        """Show the skills selection menu"""
        embed = discord.Embed(
            title='Runes & Relics - Skilling Services',
            description='Select a skill below to calculate the cost of your desired training service.\n\n**Available Discounts:**\n• Zenyte: 2% off\n• Eternal: 3% off\n• Relic: 5% off',
            color=discord.Color.blue()
        )

        # First set of skills (combat & gathering)
        first_set = [
            'attack', 'placeholder_hp', 'mining',
            'strength', 'agility', 'smithing',
            'defence', 'herblore', 'fishing',
            'ranged', 'thieving', 'cooking'
        ]

        # Second set of skills (production & support)
        second_set = [
            'prayer', 'crafting', 'firemaking',
            'magic', 'fletching', 'woodcutting',
            'runecrafting', 'slayer', 'farming',
            'construction', 'hunter'
        ]

        # Create skill buttons
        first_buttons = []
        second_buttons = []

        for skill_set, button_list in [(first_set, first_buttons), (second_set, second_buttons)]:
            current_row = []
            for i, skill_name in enumerate(skill_set):
                skill = skills.get(skill_name)
                if skill:
                    button = discord.ui.Button(
                        style=discord.ButtonStyle.secondary,
                        custom_id=f"skill_{skill_name}" if skill_name != "placeholder_hp" else "placeholder_button",
                        emoji=skill["emoji"],
                        disabled=skill_name == "placeholder_hp"
                    )
                    current_row.append(button)

                if len(current_row) == 3 or i == len(skill_set) - 1:
                    button_list.append(discord.ui.ActionRow(*current_row))
                    current_row = []

        # Send the skill selection menus
        await interaction.followup.send(
            embed=embed,
            components=first_buttons,
            ephemeral=True
        )
        await interaction.followup.send(
            components=second_buttons,
            ephemeral=True
        )

async def setup(bot):
    await bot.add_cog(Services(bot))