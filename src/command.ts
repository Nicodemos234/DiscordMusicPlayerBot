import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from 'discord.js'
import { MusicManager } from './services'

export interface Command extends ChatInputApplicationCommandData {
  run: (
    client: Client,
    interaction: CommandInteraction,
    musicManager: MusicManager
  ) => void
}
