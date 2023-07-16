"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionCreate = void 0;
const commands_1 = require("../commands");
const interactionCreate = (client, musicManager) => {
    client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction, musicManager);
        }
    });
};
exports.interactionCreate = interactionCreate;
const handleSlashCommand = async (client, interaction, musicManager) => {
    const slashCommand = commands_1.commands.find((c) => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: 'An error has occurred' });
        return;
    }
    await interaction.deferReply();
    slashCommand.run(client, interaction, musicManager);
};
//# sourceMappingURL=interactionCreate.js.map