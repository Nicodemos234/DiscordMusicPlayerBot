import { Command } from '../command'
import { Play } from './play'
import { Stop } from './stop'
import { Skip } from './skip'
import { Pause } from './pause'
import { Unpause } from './unpause'
import { Queue } from './queue'
import { Twitch } from './twitch'

export const commands: Command[] = [
  Twitch,
  Play,
  Stop,
  Skip,
  Pause,
  Unpause,
  Queue,
]
