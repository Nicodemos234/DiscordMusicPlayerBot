import { Client } from 'discord.js'
import { commands } from '../commands'

export const ready = (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return
    }

    await client.application.commands.set(commands)

    console.log(`${client.user.username} está a todo vapor Piwii`)
  })
}
