import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from 'discord.js'
import { Command } from '../command'
import {
  NoSubscriberBehavior,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'
import * as ytdl from 'ytdl-core'

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
  run: async (client: Client, interaction: CommandInteraction) => {
    const url = interaction.options.get('url')?.value
    if (!url) {
      await interaction.followUp({
        ephemeral: true,
        content: 'Por favor insira um link válido',
      })
      return
    }
    // await readLink(url + '')

    const content = 'Tocando...'
    const guild = client.guilds.cache.get(interaction.guildId) // Getting the guild.
    const member = guild.members.cache.get(interaction.user.id) // Getting the member.

    if (member.voice.channel) {
      // Checking if the member is connected to a VoiceChannel.
      // The member is connected to a voice channel.
      // https://discord.js.org/#/docs/main/stable/class/VoiceState
      const channel = member.voice.channel
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: false,
      })

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      })
      connection.subscribe(player)

      const resYTDL = ytdl(url + '', { filter: 'audioonly' })

      const resource = createAudioResource(resYTDL)

      player.play(resource)
    } else {
      // The member is not connected to a voice channel.
      console.log(`${member.user.tag} is not connected.`)
    }

    await interaction.followUp({
      ephemeral: true,
      content,
    })
  },
}
