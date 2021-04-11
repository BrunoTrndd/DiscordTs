import { Message } from 'discord.js';
import ViewMessage from './ViewMessage'

class ViewPing extends ViewMessage {
     
    /**
     * @inheritdoc
     */
     public print() : void {
        this.message.reply(`${this.response} ${this.message.client.ws.ping}ms`);
    }

}


export default ViewPing;