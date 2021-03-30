import { ControllerCommand } from "./ControllerBaseCommand";
const ModelItemInventory = require('../Model/ModelItemInventory');

class ControllerCommandInventory extends ControllerCommand {

    /**
     * @inheritdoc
     */
    public static commandsAlias : string[] = ['i', 'inv', 'inventario'];
 
    /**
     * @inheritdoc
     */
    getDescription(): string {
        return 'Mostra o inventário'
    }

    /**
     * @inheritdoc
     */
    async execute(...args: any): Promise<void> {
        let modelItemInventory = new ModelItemInventory();
        let itens = await modelItemInventory.getAllFromPlayer(args[0].author.id);
 
        this.factoryMessage.getViewIntentory(args[0], {itens : itens, playerName : args[0].author.username}).print();
    }
    
}
 
module.exports = ControllerCommandInventory;