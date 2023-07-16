import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import { ready } from './listeners/ready'
import { interactionCreate } from './listeners'
import { MusicManager } from './services'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
  ],
})

const musicManager = new MusicManager()
ready(client)
interactionCreate(client, musicManager)

//Authenticating
client.login(process.env.TOKEN)
