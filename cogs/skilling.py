from discord.ext import commands
from discord import app_commands
import discord
from utils.discounts import get_discount, apply_discount
from utils.tickets import create_service_ticket
from utils.xp import get_xp_difference
from data.skills import skills
from utils.format import format_gp

class Skilling(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    async def handle_skill_selection(self, interaction: discord.Interaction, skill_name: str):
        """Handle when a user clicks a skill button"""
        skill = skills.get(skill_name)
        if not skill:
            await interaction.response.send_message(
                content='Invalid skill selected.',
                ephemeral=True
            )
            return

        # Create service type selection embed
        embed = discord.Embed(
            title=f"{skill['name']} Training Service",
            description='Please select your preferred service type:\n\n**By Hand**: Regular price\n**Botted**: 40% discount on total price',
            color=discord.Color.blue()
        )

        # Create buttons for service type selection
        buttons = discord.ui.ActionRow(
            discord.ui.Button(
                style=discord.ButtonStyle.primary,
                custom_id=f"service_hand_{skill_name}",
                label="By Hand"
            ),
            discord.ui.Button(
                style=discord.ButtonStyle.secondary,
                custom_id=f"service_bot_{skill_name}",
                label="Botted"
            )
        )

        await interaction.response.send_message(
            embed=embed,
            components=[buttons],
            ephemeral=True
        )

    async def handle_service_type(self, interaction: discord.Interaction):
        """Handle when a user selects service type (hand/bot)"""
        custom_id = interaction.data["custom_id"]
        service_type, skill_name = custom_id.split("_")[1:]
        skill = skills.get(skill_name)

        # Create modal for level input
        modal = discord.ui.Modal(
            title=f"{skill['name']} Training Calculator",
            custom_id=f"skill_modal_{service_type}_{skill_name}"
        )

        modal.add_item(
            discord.ui.TextInput(
                label="Current Level (1-98)",
                custom_id="current_level",
                style=discord.TextStyle.short,
                placeholder="Enter your current level",
                required=True
            )
        )

        modal.add_item(
            discord.ui.TextInput(
                label="Target Level (2-99)",
                custom_id="target_level",
                style=discord.TextStyle.short,
                placeholder="Enter your target level",
                required=True
            )
        )

        await interaction.response.send_modal(modal)

    async def handle_modal_submit(self, interaction: discord.Interaction):
        """Handle when a user submits the level input modal"""
        custom_id = interaction.data["custom_id"]
        _, _, service_type, skill_name = custom_id.split("_")
        skill = skills.get(skill_name)

        try:
            current_level = int(interaction.data["components"][0]["components"][0]["value"])
            target_level = int(interaction.data["components"][1]["components"][0]["value"])

            # Validate levels
            if (current_level < 1 or current_level > 98 or
                target_level < 2 or target_level > 99 or
                current_level >= target_level):
                await interaction.response.send_message(
                    content='Please enter valid levels (current: 1-98, target: 2-99, target must be higher than current).',
                    ephemeral=True
                )
                return

            # Calculate XP needed
            xp_needed = get_xp_difference(current_level, target_level)
            total_cost = xp_needed * skill["gp_per_xp"]

            # Apply bot discount if selected
            if service_type == "bot":
                total_cost *= 0.6  # Apply 40% discount

            # Apply role-based discount
            discounted_cost = apply_discount(total_cost, get_discount(interaction.user))

            # Create embed with results
            embed = discord.Embed(
                title=f"{skill['name']} Training Calculator",
                description=f"Training from level {current_level} to {target_level}\nService Type: {'Botted (-40%)' if service_type == 'bot' else 'By Hand'}",
                color=discord.Color.blue()
            )

            embed.add_field(name="XP Required", value=f"{xp_needed:,}", inline=True)
            embed.add_field(name="Base GP/XP Rate", value=str(skill["gp_per_xp"]), inline=True)
            
            cost_text = f"{format_gp(discounted_cost)} GP"
            if get_discount(interaction.user):
                cost_text += f" ({get_discount(interaction.user) * 100:.0f}% role discount applied)"
            embed.add_field(name="Total Cost", value=cost_text, inline=False)

            # Create buttons for ticket creation or cancellation
            buttons = discord.ui.ActionRow(
                discord.ui.Button(
                    style=discord.ButtonStyle.success,
                    custom_id=f"create_ticket_{skill_name}_{current_level}_{target_level}_{service_type}",
                    label="Open Ticket"
                ),
                discord.ui.Button(
                    style=discord.ButtonStyle.secondary,
                    custom_id="cancel_ticket",
                    label="Cancel"
                )
            )

            await interaction.response.send_message(
                embed=embed,
                components=[buttons],
                ephemeral=True
            )

        except ValueError:
            await interaction.response.send_message(
                content='Please enter valid numbers for the levels.',
                ephemeral=True
            )
        except Exception as e:
            print(f"Error calculating training costs: {e}")
            await interaction.response.send_message(
                content='An error occurred while calculating training costs. Please try again.',
                ephemeral=True
            )

    async def handle_ticket_creation(self, interaction: discord.Interaction):
        """Handle when a user clicks the create ticket button"""
        custom_id = interaction.data["custom_id"]
        _, skill_name, current_level, target_level, service_type = custom_id.split("_")
        skill = skills.get(skill_name)

        try:
            current_level = int(current_level)
            target_level = int(target_level)
            xp_needed = get_xp_difference(current_level, target_level)
            total_cost = xp_needed * skill["gp_per_xp"]

            # Apply bot discount if selected
            if service_type == "bot":
                total_cost *= 0.6

            discounted_cost = apply_discount(total_cost, get_discount(interaction.user))

            # Create ticket content
            ticket_content = {
                "type": "Skilling",
                "skill": skill["name"],
                "details": f"{skill['name']} training from level {current_level} to {target_level}\nService Type: {'Botted' if service_type == 'bot' else 'By Hand'}",
                "price": discounted_cost,
                "discount": get_discount(interaction.user)
            }

            await create_service_ticket(interaction, ticket_content)

        except Exception as e:
            print(f"Error creating skilling ticket: {e}")
            await interaction.response.send_message(
                content='An error occurred while creating your ticket. Please try again.',
                ephemeral=True
            )

async def setup(bot):
    await bot.add_cog(Skilling(bot))