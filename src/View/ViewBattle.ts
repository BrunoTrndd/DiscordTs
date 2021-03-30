import { Message, MessageEmbed } from "discord.js";
import ViewMessage from "./ViewMessage";

class ViewBattle extends ViewMessage {
    
    private battle : any;

    public print(): void { }
    
    public async createBattle(info : any) : Promise<Message> {
        let battle = new MessageEmbed();
        battle.setTitle(`Duelo`)
              .addField(`${info.player.name}`, `HP: ${info.player.currenthp}`, true)
              .addField(`${info.monster.name}`, `HP: ${info.monster.currenthp}`, true)
              .addField(`Ações:`, '.');
        this.battle = await this.message.channel.send(battle);
        return this.battle;
    }

    editBattle(info : any) {
        let newBattle  = new MessageEmbed(this.battle.embeds[0]);
        let playerRow  = newBattle.fields[0];
        let monsterRow = newBattle.fields[1];
        let actionRow  = newBattle.fields[2];
        playerRow.name = info.player.name;

        this.battle.edit(newBattle);
    }

}

export default ViewBattle