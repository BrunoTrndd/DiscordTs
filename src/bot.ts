import { Client, Message } from "discord.js";
import { ControllerHandlerCommand } from "./Controller/ControllerHandlerCommand"

/**
 * Classe principal, é a classe que inicializa o Bot e se cadastra como listener do objeto Client
 */
export class Bot {

    private token : string;
    private prefix: string;

    constructor(prefix : string, token : string) {
        this.prefix = prefix;
        this.token = token;
    }
    
    /**
     * A onde a mágica acontece, esse método é responsável pelo bot ficar logado e na espera de novas mensagens,
     * pois fica cadastrado como listener do objeto Client no evento 'message' que ocorre sempre que é mandado
     * mensagem em algum servidor que o bot está logado.
     * @returns string
     */
    public listen() : Promise<string> {
        let client = new Client();
        
        client.on('message', (message : Message) => {
            if(!message.content.startsWith(this.prefix) || message.author.bot) return;
            new ControllerHandlerCommand(message).handle();

        });
        return client.login(this.token);
    }

}