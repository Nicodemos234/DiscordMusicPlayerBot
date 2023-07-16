"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const discord_js_1 = require("discord.js");
exports.Queue = {
    name: 'queue',
    description: 'Mostrar a fila de músicas',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    run: async (client, interaction, musicManager) => {
        let content = '';
        const guild = client.guilds.cache.get(interaction.guildId); // Getting the guild.
        const member = guild.members.cache.get(interaction.user.id); // Getting the member.
        if (member.voice.channel) {
            const channel = member.voice.channel;
            content = musicManager.queue(channel) || '';
        }
        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
};
//# sourceMappingURL=queue.js.map