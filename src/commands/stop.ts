import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from 'discord.js'
import { Command } from '../command'
import { MusicManager } from '../services'

export const Stop: Command = {
  name: 'stop',
  description: 'Parar música e sair do canal',
  type: ApplicationCommandType.ChatInput,
  run: async (
    client: Client,
    interaction: CommandInteraction,
    musicManager: MusicManager
  ) => {
    let content = ''
    const guild = client.guilds.cache.get(interaction.guildId) // Getting the guild.
    const member = guild.members.cache.get(interaction.user.id) // Getting the member.

    if (member.voice.channel) {
      const channel = member.voice.channel
      content = musicManager.stop(channel) || ''
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    })
  },
}
