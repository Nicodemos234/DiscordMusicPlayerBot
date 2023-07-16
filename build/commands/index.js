"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const play_1 = require("./play");
const stop_1 = require("./stop");
const skip_1 = require("./skip");
const pause_1 = require("./pause");
const unpause_1 = require("./unpause");
const queue_1 = require("./queue");
const twitch_1 = require("./twitch");
exports.commands = [
    twitch_1.Twitch,
    play_1.Play,
    stop_1.Stop,
    skip_1.Skip,
    pause_1.Pause,
    unpause_1.Unpause,
    queue_1.Queue,
];
//# sourceMappingURL=index.js.map