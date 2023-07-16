import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../command'

export const Twitch: Command = {
  name: 'twitch',
  description: 'Retorna a twitch do criador',
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'Segue nós na twitch: https://twitch.tv/Nicodemos234 :)'

    await interaction.followUp({
      ephemeral: true,
      content,
    })
  },
}
