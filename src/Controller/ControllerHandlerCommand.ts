import { Message } from "discord.js";
import { Conf } from '../Model/Config/config';
const fs = require('fs');

export class ControllerHandlerCommand {

    private message : Message;

    constructor(message : Message) { 
        this.message = message;
    }

    public handle() {
        let command = this.getCommandFromMessage();
        let controllers = fs.readdirSync('./DiscordTs/src/Controller').filter((file : string) => {return file.startsWith('ControllerCommand') && file.endsWith('.ts')});
        for (const controller of controllers) {
            const cont = require(`./${controller}`); 
            for (const commandAlias of cont.commandsAlias) {
                if(commandAlias == command.name) {
                    new cont().execute(this.message, command.args);
                }
            }
        }
    }

    private getCommandFromMessage() {
        let pieces = this.message.content.split(' ');
        let commandName = pieces.shift().toLowerCase();
        commandName = commandName.slice(Conf.prefix.length, commandName.length); 
        return {'name' : commandName, 'args' : pieces};
    }



}