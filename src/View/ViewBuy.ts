import ViewMessage from './ViewMessage'

class ViewBuy extends ViewMessage {
     
    /**
     * @inheritdoc
     */
    public print() : void {
        this.message.reply(`Adicionado ${this.response.amount} ${this.response.itemName} ao seu inventário.`);
    }


}


export default ViewBuy;