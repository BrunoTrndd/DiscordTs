import { ControllerCommand } from "./ControllerBaseCommand";

const ModelPlayer = require('../Model/ModelPlayer');
const ModelItemInventory = require('../Model/ModelItemInventory');

class ControllerCommandProfile extends ControllerCommand {

    /** Utilizado para comparação do comando do player */
    public static commandsAlias : string[] = ['profile', 'perfil', 'p'];
 
    private modelPlayer;
    private modelInventory;

    constructor(message) {
        super(message);
        this.modelPlayer = new ModelPlayer();
        this.modelInventory = new ModelItemInventory();
    }

    /**
     * @inheritdoc
     */
    getDescription(): string {
        return 'Mostra o perfil com as suas informações.';
    }

    /**
     * Comando de exemplo, ele só chama a mensagem e responde com o ping da api
     */
    async execute(...args: any): Promise<void> {
        console.log(args);
        
        let player    = await this.modelPlayer.getRecord({idplayer : args[0].author.id});
        let itemCobre = await this.modelInventory.getMoneyFromPlayer(args[0].author.id);

        this.factoryMessage.getViewProfile(args[0], {player, money : itemCobre}).print();
    }
    
}
 
module.exports = ControllerCommandProfile;