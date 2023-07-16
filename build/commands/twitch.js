"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twitch = void 0;
const discord_js_1 = require("discord.js");
exports.Twitch = {
    name: 'twitch',
    description: 'Retorna a twitch do criador',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    run: async (_, interaction) => {
        const content = 'Segue nós na twitch: https://twitch.tv/Nicodemos234 :)';
        await interaction.followUp({
            ephemeral: true,
            content,
        });
    },
};
//# sourceMappingURL=twitch.js.map