"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
const commands_1 = require("../commands");
const ready = (client) => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }
        await client.application.commands.set(commands_1.commands);
        console.log(`${client.user.username} está a todo vapor Piwii`);
    });
};
exports.ready = ready;
//# sourceMappingURL=ready.js.map