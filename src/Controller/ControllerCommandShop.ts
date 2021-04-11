import { ControllerCommand } from "./ControllerBaseCommand";

const ModelShop     = require('../Model/ModelShop');
const ModelItemShop = require('../Model/ModelItemShop');
const ModelItem     = require('../Model/ModelItem');

class ControllerCommandShop extends ControllerCommand {

    private modelShop;
    private modelItemShop;
    private modelItem;
    
    public static commandsAlias : string[] = ['shop'];

    
    constructor(message) {
        super(message);
        this.modelShop     = new ModelShop();
        this.modelItemShop = new ModelItemShop();
        this.modelItem     = new ModelItem();
    }

    /**
     * @inheritdoc
     */
    getDescription(): string {
        return 'Abre a loja'
    }

    /**
     * Busca a loja e mostra seus itens, a vitrine das lojas, se não for informado um nome de loja, será mostrada a loja inicial
     * @param args 
     * @returns null
     */
    async execute(...args: any): Promise<void> {
        let shopName = args[1].length > 0 ? args[1] : 'Loja Inicial';
        let shop = await this.modelShop.getRecordByDescription(shopName);
        if(!shop) {
            this.factoryMessage.getViewError(args[0], args[1]).printErrorShopNotFound();
            return;
        }
        let itensShop = await this.modelItemShop.getAllFromShop(shop.dataValues.idshop);
        let jhonsonItemShop = [];
        jhonsonItemShop.push();
        for(const itemShop of itensShop) {
            let item = await this.modelItem.getRecord(itemShop.dataValues.iditem);
            jhonsonItemShop.push({
                name        : item.dataValues.name,
                description : item.dataValues.description,
                subTitle    : `${itemShop.dataValues.price} Copper`
            });
        }
        
        this.factoryMessage.getViewShop(args[0], {itens : jhonsonItemShop, shopName : shopName}).print();
    }
    
}
 
module.exports = ControllerCommandShop;