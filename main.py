import os
import discord
from discord.ext import commands
import asyncio

class ServicesBot(commands.Bot):
    def __init__(self):
        intents = discord.Intents.default()
        intents.message_content = True
        intents.members = True
        intents.presences = True
        
        super().__init__(
            command_prefix='!',  # We won't use this but it's required
            intents=intents,
            application_id=os.getenv('CLIENT_ID')
        )

    async def setup_hook(self):
        # Load all cogs
        for filename in os.listdir('./cogs'):
            if filename.endswith('.py'):
                await self.load_extension(f'cogs.{filename[:-3]}')
        
        # Sync commands with Discord
        await self.tree.sync()

    async def on_ready(self):
        print(f'Logged in as {self.user.tag}!')

async def main():
    bot = ServicesBot()
    await bot.start(os.getenv('DISCORD_TOKEN'))

if __name__ == "__main__":
    asyncio.run(main())