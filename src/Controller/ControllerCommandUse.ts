import { ControllerCommand } from "./ControllerBaseCommand";
import { EnumItemType } from "./Enum/EnumItemType";
const ModelItemInventory = require('../Model/ModelItemInventory');
const ModelItem = require('../Model/ModelItem');
const ModelPlayer = require('../Model/ModelPlayer');


class ControllerCommandPing extends ControllerCommand {

    /** Utilizado para comparação do comando do player */
    public static commandsAlias : string[] = ['use', 'u'];
 
    private modelItemInventory;
    private modelPlayer;
    private modelItem;

    constructor(message) {
        super(message);
        this.modelItemInventory = new ModelItemInventory();
        this.modelItem          = new ModelItem();
        this.modelPlayer        = new ModelPlayer();
    }

    /**
     * @inheritdoc
     */
    getDescription(): string {
        return 'Utiliza itens do inventario'
    }

    /**
     * Comando para utilizar itens do seu inventario
     */
    async execute(...args: any): Promise<void> {
        const itemName = args[1];
        const item = await this.modelItem.getRecordByDescription(itemName);
        if(!item) {
            this.factoryMessage.getViewError(args[0], itemName).printErrorItemNotFound();
            return;
        }
        if(item.type !== EnumItemType.HEAL_ITEM) {
            this.factoryMessage.getViewError(args[0], itemName).printErrorItemIsNotHealable();
            return;
        }
        const itemInv = await this.modelItemInventory.getRecord({
            idplayer : args[0].author.id,
            iditem : item.iditem
        });
        if(!itemInv) {
            this.factoryMessage.getViewError(args[0], itemName).printErrorItemNotInInventory();
            return;
        }
        itemInv.amount -= 1;
        
        let player = await this.modelPlayer.getRecord({
            idplayer : args[0].author.id
        });
        player.currenthp += item.value;
        await player.save();
        if(itemInv.amount == 0) {
            await itemInv.destroy();
        } else {
            await itemInv.save();
        }

        this.factoryMessage.getViewIntentory(args[0], item).printUsedItem();
    }
    
}
 
module.exports = ControllerCommandPing;