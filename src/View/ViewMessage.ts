import { Message } from "discord.js";

abstract class ViewMessage {

    protected message : Message;
    protected response : any;

    constructor(message : Message, response : any = '') {
        this.message = message;
        this.response = response;
    }

    public abstract print() : void;

}

export default ViewMessage;