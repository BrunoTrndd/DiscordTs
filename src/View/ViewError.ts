import ViewMessage from "./ViewMessage";

class ViewError extends ViewMessage{
    
    
    public print(): void { }
    
    public printErrorShopNotFound() {
        this.message.reply(` a loja ${this.response} não existe!`);
    }
    
    public printErrorItemNotFound() {
        this.message.reply(` o item ${this.response} não existe!`);
    }
    
    public printErrorItemNotForSale() {
        this.message.reply(` o item ${this.response} não está a venda!`);
    }
    
    printErrorNotEnoughtMoney(price: number, having: any) {
        this.message.reply(` são necessários ${price} Copper(s) para completar a compra, você tem ${having}.`);
        
    }

    printErrorMonsterNotExists() {
        this.message.reply(` o monstro ${this.response} não existe para duelo.`);
    }

}

export default ViewError;