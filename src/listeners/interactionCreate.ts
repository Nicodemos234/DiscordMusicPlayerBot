import { CommandInteraction, Client, Interaction } from 'discord.js'
import { commands } from '../commands'
import { MusicManager } from '../services'

export const interactionCreate = (
  client: Client,
  musicManager: MusicManager
): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction, musicManager)
    }
  })
}

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction,
  musicManager: MusicManager
): Promise<void> => {
  const slashCommand = commands.find((c) => c.name === interaction.commandName)
  if (!slashCommand) {
    interaction.followUp({ content: 'An error has occurred' })
    return
  }

  await interaction.deferReply()

  slashCommand.run(client, interaction, musicManager)
}
