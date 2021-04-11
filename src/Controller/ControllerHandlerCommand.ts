import { Message } from "discord.js";
import { Conf } from '../Model/Config/config';
const fs = require('fs');

export class ControllerHandlerCommand {

    private message : Message;

    constructor(message : Message) { 
        this.message = message;
    }

    /**
     * Processa a mensagem que foi passada no construtor da classe, repartindo a mensagem em pedaços separados por " "(espaço)
     */
    public handle() {
        //reparte a mensagem, separando por espaço Ex. [prefix]battle Javali vira ['battle', 'Javali']
        let command = this.getCommandFromMessage();
        //busca a referencia a todos os arquivos dos controllers, sem instanciar
        let controllers = fs.readdirSync('./DiscordTs/src/Controller').filter((file : string) => {return file.startsWith('ControllerCommand') && file.endsWith('.ts')});
        for (const controller of controllers) {
            //Faz o require dos controllers para buscar a referência ao atributo estático commandsAlias
            const cont = require(`./${controller}`); 
            for (const commandAlias of cont.commandsAlias) {
                //para cada comando que é declarado no controller, ele compara se é o comando que o player digitou
                if(commandAlias == command.name) {
                    //se o comando digitado for o mesmo do controller, é instanciado o controller, passando a 
                    //mensagem como parâmetro e invocando o método execute da classe abstrata
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