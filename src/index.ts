import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import { ready } from './listeners/ready'
import { interactionCreate } from './listeners'

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

ready(client)
interactionCreate(client)

//Authenticating
client.login(process.env.TOKEN)
