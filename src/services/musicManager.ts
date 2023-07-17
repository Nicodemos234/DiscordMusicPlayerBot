import {
  AudioPlayer,
  NoSubscriberBehavior,
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice'
import { VoiceBasedChannel } from 'discord.js'
import ytdl from 'ytdl-core'

const NO_CHANNEL_ERROR = 'Não estou em um canal de música bobo :)'

class Music {
  url: string
  name: string

  constructor(url: string, name: string) {
    this.url = url
    this.name = name
  }
}

class Player {
  id: string
  playing: Music
  queue: Music[] = []
  connection: VoiceConnection
  audioPlayer: AudioPlayer

  constructor(
    id: string,
    connection: VoiceConnection,
    audioPlayer: AudioPlayer
  ) {
    this.id = id
    this.connection = connection
    this.audioPlayer = audioPlayer

    this.audioPlayer.on('stateChange', (oldState, newState) => {
      if (oldState.status === 'playing' && newState.status === 'idle') {
        this.playNext()
      }
    })
    this.connection.subscribe(this.audioPlayer)
  }

  addToQueue(music: Music) {
    this.queue.push(music)
  }

  playNext() {
    const newMusic = this.queue.shift()
    if (newMusic) {
      this.playing = newMusic
      const resYTDL = ytdl(newMusic.url, { filter: 'audioonly' })

      const resource = createAudioResource(resYTDL)

      this.audioPlayer.play(resource)
      return `Tocando a próxima música de nome > ${newMusic.name}...`
    }
    return 'A fila está vazia. Nenhuma música encontrada para tocar :('
  }

  stop() {
    this.audioPlayer.stop()
    this.connection.destroy()
    return 'Se autodestruindo :D'
  }

  pause() {
    this.audioPlayer.pause()
    return 'Música pausada'
  }

  unpause() {
    this.audioPlayer.unpause()
    return 'Música despausada'
  }

  getQueueList() {
    const list = this.queue
      .map((music, index) => `${index + 1} - ${music.name}`)
      .join('\n')
    return `Tocando agora: ${this.playing.name}\nLista de músicas na fila:\n${list}`
  }
}

export class MusicManager {
  players: Player[] = []

  async addMusicOrStartPlay(url: string, channel: VoiceBasedChannel) {
    const player = this.players.find((player) => player.id === channel.id)
    const info = await ytdl.getInfo(url)
    const music = new Music(url, info.videoDetails.title)
    if (player && !!player.playing) {
      player.addToQueue(music)
      return `${music.name} adicionada a fila.`
    } else {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: false,
      })
      const audioPlayer = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      })
      const player = new Player(channel.id, connection, audioPlayer)
      player.addToQueue(music)
      player.playNext()
      this.players.push(player)
      return `Tocando ${music.name}.`
    }
  }

  stop(channel: VoiceBasedChannel) {
    const player = this.players.find((player) => player.id === channel.id)
    if (player && !!player.playing) {
      this.players = this.players.filter((player) => player.id !== channel.id)
      return player.stop()
    } else {
      return NO_CHANNEL_ERROR
    }
  }

  skip(channel: VoiceBasedChannel) {
    const player = this.players.find((player) => player.id === channel.id)
    if (player && !!player.playing) {
      return player.playNext()
    } else {
      return NO_CHANNEL_ERROR
    }
  }

  pause(channel: VoiceBasedChannel) {
    const player = this.players.find((player) => player.id === channel.id)
    if (player && !!player.playing) {
      return player.pause()
    } else {
      return NO_CHANNEL_ERROR
    }
  }

  unpause(channel: VoiceBasedChannel) {
    const player = this.players.find((player) => player.id === channel.id)
    if (player && !!player.playing) {
      return player.unpause()
    } else {
      return NO_CHANNEL_ERROR
    }
  }

  queue(channel: VoiceBasedChannel) {
    const player = this.players.find((player) => player.id === channel.id)
    if (player && !!player.playing) {
      return player.getQueueList()
    } else {
      return NO_CHANNEL_ERROR
    }
  }
}
