import { MessageEmbed } from "discord.js";
import ViewMessage from "./ViewMessage";
import EnumViewColor from './Enum/ViewEnumColor';

class ViewInventory extends ViewMessage{

    public print(): void {
        let message = new MessageEmbed()
            .setTitle(`Itens do player ${this.response.playerName}`)
            .setColor(EnumViewColor.Inventory);

        this.response.itens.forEach((itemInv: { name: any; amount: any; description: any; }) => {
            message.addField(`${itemInv.name} - ${itemInv.amount} Un.`, itemInv.description);
        })    

        this.message.reply(message);
    }
    
}


export default ViewInventory;