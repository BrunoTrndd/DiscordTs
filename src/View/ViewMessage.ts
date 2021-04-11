import { Message } from "discord.js";

abstract class ViewMessage {

    protected message : Message;
    protected response : any;

    constructor(message : Message, response : any = '') {
        this.message = message;
        this.response = response;
    }

    /**
     * Irá utilizar a mensagem que foi passada como parâmetro no construtor
     * para responder o usuário com a mensagem definida pela view concreta
     */
    public abstract print() : void;

}

export default ViewMessage;