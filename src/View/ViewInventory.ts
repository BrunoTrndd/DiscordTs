import { MessageEmbed } from "discord.js";
import ViewMessage from "./ViewMessage";
import EnumViewColor from './Enum/ViewEnumColor';

class ViewInventory extends ViewMessage{
    

    /**
     * @inheritdoc
     */
    public print(): void {
        let message = new MessageEmbed()
            .setTitle(`Itens do player ${this.response.playerName}`)
            .setColor(EnumViewColor.Inventory);
        this.response.itens.forEach((itemInv: { name: any; amount: any; description: any; }) => {
            message.addField(`${itemInv.name} - ${itemInv.amount} Un.`, itemInv.description);
        })    
        this.message.reply(message);
    }

    printUsedItem() {
        this.message.reply(` o item ${this.response.name} foi consumido!`);
    }
    
}


export default ViewInventory;