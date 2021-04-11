import { Message, MessageEmbed } from 'discord.js';
import ViewEnumColor from './Enum/ViewEnumColor';
import ViewMessage from './ViewMessage'

class ViewProfile extends ViewMessage {
     
    /**
     * @inheritdoc
     */
    public print() : void {
        let message = new MessageEmbed();
        message.setColor(ViewEnumColor.Profile);
        message.setThumbnail(this.message.author.avatarURL());
        message.addField(`HP:`,`${this.response.player.currenthp}`,true);
        message.addField(`Nível:`,`${this.response.player.level}`,true);
        message.addField(`Exp.:`,`${this.response.player.experience}`,true);
        message.addField(`Dinheiro:`,`${this.response.money.amount} Cobre`,true);
        this.message.reply(message);
    }

}


export default ViewProfile;