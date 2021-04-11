import { Message } from "discord.js";
import { ControllerCommand } from "./ControllerBaseCommand";
const ModelPlayer = require('../Model/ModelPlayer');
const ModelPlayerStatus = require('../Model/ModelPlayerStatus');
/**
 * Inicia o jogador, criando sua instância no banco
 */
class ControllerCommandStart extends ControllerCommand{

    public static commandsAlias : string[] = ['start'];

    private player;
    private playerStatus;

    constructor(message : Message) {
        super(message);
        this.player = new ModelPlayer();
        this.playerStatus = new ModelPlayerStatus();
    }

    /**
     * @inheritdoc
     */
    getDescription(): string {
        return 'Inicializa o player';
    }

    /**
     * Cria o jogador, caso já tenha um jogador cadastrado, é mostrado uma mensagem de erro
     */
    async execute(...args: any): Promise<void> {
        let message = args[0];
        let player = await this.player.getRecord({idplayer : message.author.id});
        
        if(player) {
            this.factoryMessage.getViewError(message, '').printErrorPlayerIsAlreadyCreated();
            return;
        }
        
        this.player.addRecord({
            idplayer : message.author.id,
            name : message.author.username
        })
        this.playerStatus.addRecord({
            idplayer : message.author.id
        });
        this.factoryMessage.getViewStart(message, '').print();
    }

}

module.exports = ControllerCommandStart;