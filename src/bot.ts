import { Client, Message } from "discord.js";
import { ControllerHandlerCommand } from "./Controller/ControllerHandlerCommand"
export class Bot {

    private token : string;
    private prefix: string;

    constructor(prefix : string, token : string) {
        this.prefix = prefix;
        this.token = token;
    }

    public listen() : Promise<string> {
        let client = new Client();
        client.on('message', (message : Message) => {
            if(!message.content.startsWith(this.prefix) || message.author.bot) return;
            // console.log('pre handle');
            new ControllerHandlerCommand(message).handle();

        });
        return client.login(this.token);
    }

}