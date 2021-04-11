import { ControllerCommand } from "./ControllerBaseCommand";

const ModelItemShop      = require('../Model/ModelItemShop');
const ModelItemInventory = require('../Model/ModelItemInventory');
const ModelItem          = require('../Model/ModelItem');

class ControllerCommandBuy extends ControllerCommand {

    public static commandsAlias : string[] = ['buy'];
    
    private item;
    private itemInventory;
    private itemShop;
 

    constructor(message) {
        super(message);
        this.item = new ModelItem();
        this.itemInventory = new ModelItemInventory();
        this.itemShop = new ModelItemShop();
    }

    /**
     * @inheritdoc
     */
    getDescription(): string {
        return 'Compra itens da loja da cidade onde o jogador está localizado.'
    }

    /**
     * Compra o item, busca o tem em alguma loja, se tiver, busca o valor e faz o calculo do dinheiro, subtrai do inventario do jogador e adiciona o(s) item(ns)
     * @param args [Message, ['nomeItem', 'quantidade']]
     * @returns null
     */
    async execute(...args: any): Promise<void> {
        let item  = await this.item.getRecordByDescription(args[1][0]);
        if(!item) {
            this.factoryMessage.getViewError(args[0], args[1][0]).printErrorItemNotFound();
            return;
        }
        let idItem = item.dataValues.iditem;
        let price = await this.itemShop.getItemPrice(idItem);
        if(!price) {
            this.factoryMessage.getViewError(args[0], args[1][0]).printErrorItemNotForSale();
            return;
        }
        let money = await this.itemInventory.getMoneyFromPlayer(args[0].author.id);
        let amount = args[1][1] !== undefined ?  parseInt(args[1][1]) : 1;
        if(price*amount > money.dataValues.amount) {
            this.factoryMessage.getViewError(args[0], args[1][1]).printErrorNotEnoughtMoney(price * amount, money.dataValues.amount);
            return;
        }
        
        money.amount = money.dataValues.amount - price*amount;
        
        await this.itemInventory.addRecord({
            iditem  : idItem, 
            idplayer: args[0].author.id, 
            amount  : amount
        });
        money.save();
        return this.factoryMessage.getViewBuy(args[0], {itemName : args[1][0], amount : amount}).print();
    }
    
}
 
module.exports = ControllerCommandBuy;