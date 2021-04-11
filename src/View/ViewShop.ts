import { MessageEmbed } from "discord.js";
import ViewEnumColor from "./Enum/ViewEnumColor";
import ViewMessage from "./ViewMessage";

class ViewShop extends ViewMessage {

    /**
     * @inheritdoc
     */
    public print(): void {
        let message = new MessageEmbed()
            .setTitle(this.response.shopName)
            .setColor(ViewEnumColor.BeginnerShop);
        this.response.itens.forEach(ele => {
            message.addField(`${ele.name} - ${ele.subTitle}`, ele.description);
        });
        this.message.reply(message);
    } 
    
}

export default ViewShop;