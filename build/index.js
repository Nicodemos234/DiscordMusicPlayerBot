"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const ready_1 = require("./listeners/ready");
const listeners_1 = require("./listeners");
const services_1 = require("./services");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildPresences,
    ],
});
const musicManager = new services_1.MusicManager();
(0, ready_1.ready)(client);
(0, listeners_1.interactionCreate)(client, musicManager);
//Authenticating
client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map