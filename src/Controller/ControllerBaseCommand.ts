import { Message } from "discord.js";
import ViewFactoryMessage from '../View/ViewFactoryMessage'

/**
 * Classe base para o controle dos comandos que serão executados
 */
export abstract class ControllerCommand {

    protected message : Message;
    
    protected factoryMessage : ViewFactoryMessage;

    /**
     * Recebendo a mensagem é possível analisar seu conteúdo, canal, quem mandou, hora, etc...;
     * @param message 
     */
    constructor(message: Message) {
        this.message = message;
        this.factoryMessage = new ViewFactoryMessage();
    }

    /**
     * Descrição do comando para ser adicionada no Help
     * @returns descrição
     */
    abstract getDescription() : string;

    /**
     * 
     * @param args Mensagem em texto e seus parametros
     */
    abstract execute(...args : any) : void;

}
