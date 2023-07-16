import 'dotenv/config'
import { Client } from 'discord.js'
import { ready } from './listeners/ready'
import { interactionCreate } from './listeners'

const client = new Client({
  intents: [],
})

ready(client)
interactionCreate(client)

//Authenticating
client.login(process.env.TOKEN)
