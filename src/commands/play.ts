import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from 'discord.js'
import { Command } from '../command'
import { MusicManager } from '../services'

export const Play: Command = {
  name: 'play',
  description: 'Tocador de músicas',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'url',
      description: 'Link da música',
    },
  ],
  type: ApplicationCommandType.ChatInput,
  run: async (
    client: Client,
    interaction: CommandInteraction,
    musicManager: MusicManager
  ) => {
    const url = interaction.options.get('url')?.value
    if (!url) {
      await interaction.followUp({
        ephemeral: true,
        content: 'Por favor insira um link válido',
      })
      return
    }

    let content = 'Tocando...'
    const guild = client.guilds.cache.get(interaction.guildId) // Getting the guild.
    const member = guild.members.cache.get(interaction.user.id) // Getting the member.

    if (member.voice.channel) {
      const channel = member.voice.channel
      content =
        (await musicManager.addMusicOrStartPlay(url + '', channel)) || ''
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    })
  },
}
