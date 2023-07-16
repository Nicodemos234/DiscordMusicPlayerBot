"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pause = void 0;
const discord_js_1 = require("discord.js");
exports.Pause = {
    name: 'pause',
    description: 'Pausar música',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    run: async (client, interaction, musicManager) => {
        let content = '';
        const guild = client.guilds.cache.get(interaction.guildId); // Getting the guild.
        const member = guild.members.cache.get(interaction.user.id); // Getting the member.
        if (member.voice.channel) {
            const channel = member.voice.channel;
            content = musicManager.pause(channel) || '';
        }
        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
};
//# sourceMappingURL=pause.js.map