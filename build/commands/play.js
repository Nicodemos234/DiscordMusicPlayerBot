"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Play = void 0;
const discord_js_1 = require("discord.js");
exports.Play = {
    name: 'play',
    description: 'Tocador de músicas',
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.String,
            name: 'url',
            description: 'Link da música',
        },
    ],
    type: discord_js_1.ApplicationCommandType.ChatInput,
    run: async (client, interaction, musicManager) => {
        const url = interaction.options.get('url')?.value;
        if (!url) {
            await interaction.followUp({
                ephemeral: true,
                content: 'Por favor insira um link válido',
            });
            return;
        }
        let content = 'Tocando...';
        const guild = client.guilds.cache.get(interaction.guildId); // Getting the guild.
        const member = guild.members.cache.get(interaction.user.id); // Getting the member.
        if (member.voice.channel) {
            const channel = member.voice.channel;
            content =
                (await musicManager.addMusicOrStartPlay(url + '', channel)) || '';
        }
        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
};
//# sourceMappingURL=play.js.map