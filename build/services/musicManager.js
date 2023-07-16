"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicManager = void 0;
const tslib_1 = require("tslib");
const voice_1 = require("@discordjs/voice");
const ytdl_core_1 = tslib_1.__importDefault(require("ytdl-core"));
const NO_CHANNEL_ERROR = 'Não estou em um canal de música bobo :)';
class Music {
    constructor(url, name) {
        this.url = url;
        this.name = name;
    }
}
class Player {
    constructor(id, connection, audioPlayer) {
        this.queue = [];
        this.id = id;
        this.connection = connection;
        this.audioPlayer = audioPlayer;
        this.audioPlayer.on('stateChange', (oldState, newState) => {
            if (oldState.status === 'playing' && newState.status === 'idle') {
                this.playNext();
            }
        });
        this.connection.subscribe(this.audioPlayer);
    }
    addToQueue(music) {
        this.queue.push(music);
    }
    playNext() {
        const newMusic = this.queue.pop();
        if (newMusic) {
            this.playing = newMusic;
            const resYTDL = (0, ytdl_core_1.default)(newMusic.url, { filter: 'audioonly' });
            const resource = (0, voice_1.createAudioResource)(resYTDL);
            this.audioPlayer.play(resource);
            return `Tocando a próxima música de nome > ${newMusic.name}...`;
        }
        return 'A fila está vazia. Nenhuma música encontrada para tocar :(';
    }
    stop() {
        this.audioPlayer.stop();
        this.connection.destroy();
        return 'Se autodestruindo :D';
    }
    pause() {
        this.audioPlayer.pause();
        return 'Música pausada';
    }
    unpause() {
        this.audioPlayer.unpause();
        return 'Música despausada';
    }
    getQueueList() {
        const list = this.queue
            .map((music, index) => `${index + 1} - ${music.name}`)
            .join('\n');
        return `Tocando agora: ${this.playing.name}\nLista de músicas na fila:\n${list}`;
    }
}
class MusicManager {
    constructor() {
        this.players = [];
    }
    async addMusicOrStartPlay(url, channel) {
        const player = this.players.find((player) => player.id === channel.id);
        const info = await ytdl_core_1.default.getInfo(url);
        const music = new Music(url, info.videoDetails.title);
        if (player && !!player.playing) {
            player.addToQueue(music);
            return `${music.name} adicionada a fila.`;
        }
        else {
            const connection = (0, voice_1.joinVoiceChannel)({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: true,
                selfMute: false,
            });
            const audioPlayer = (0, voice_1.createAudioPlayer)({
                behaviors: {
                    noSubscriber: voice_1.NoSubscriberBehavior.Pause,
                },
            });
            const player = new Player(channel.id, connection, audioPlayer);
            player.addToQueue(music);
            player.playNext();
            this.players.push(player);
            return `Tocando ${music.name}.`;
        }
    }
    stop(channel) {
        const player = this.players.find((player) => player.id === channel.id);
        if (player && !!player.playing) {
            return player.stop();
        }
        else {
            return NO_CHANNEL_ERROR;
        }
    }
    skip(channel) {
        const player = this.players.find((player) => player.id === channel.id);
        if (player && !!player.playing) {
            return player.playNext();
        }
        else {
            return NO_CHANNEL_ERROR;
        }
    }
    pause(channel) {
        const player = this.players.find((player) => player.id === channel.id);
        if (player && !!player.playing) {
            return player.pause();
        }
        else {
            return NO_CHANNEL_ERROR;
        }
    }
    unpause(channel) {
        const player = this.players.find((player) => player.id === channel.id);
        if (player && !!player.playing) {
            return player.unpause();
        }
        else {
            return NO_CHANNEL_ERROR;
        }
    }
    queue(channel) {
        const player = this.players.find((player) => player.id === channel.id);
        if (player && !!player.playing) {
            return player.getQueueList();
        }
        else {
            return NO_CHANNEL_ERROR;
        }
    }
}
exports.MusicManager = MusicManager;
//# sourceMappingURL=musicManager.js.map