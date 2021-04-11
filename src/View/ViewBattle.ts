import { Message, MessageEmbed } from "discord.js";
import { EnumBattleStates } from "../Controller/Enum/EnumBattleStates";
import ViewMessage from "./ViewMessage";

class ViewBattle extends ViewMessage {
    
    private battle : any;

    public print(): void { }

    /**
     * Cria o embed da batalha e o retorna
     * @param info json com o player e o monstro para o duelo
     * @returns MessageEmbed
     */
    public async createBattle(info : any) : Promise<Message> {
        let battle = new MessageEmbed();
        battle.setTitle(`Duelo`)
              .addField(`${info.player.name}`, `HP: ${info.player.currenthp}`, true)
              .addField(`${info.monster.name}`, `HP: ${info.monster.maxhp}`, true)
              .addField(`Ações:`, 'A batalha irá começar!');
        this.battle = await this.message.channel.send(battle);
        return this.battle;
    }

    /**
     * Edita a batalha que está sendo referenciada na instância desse objeto
     * @param info json com as linhas do Embed que será alterado
     * @returns null
     */
    editBattle(info : any) {
        let newBattle  = new MessageEmbed(this.battle.embeds[0]);
        let playerRow  = newBattle.fields[0];
        let monsterRow = newBattle.fields[1];
        let actionRow  = newBattle.fields[2];
        if(info.battleStatus == EnumBattleStates.MONSTER_VICTORY || info.battleStatus == EnumBattleStates.PLAYER_VICTORY){
            if(info.player) playerRow.value = `HP: ${info.player.currenthp}`;
            if(info.monster) monsterRow.value = `HP: ${info.monster.currenthp}`;
            actionRow.value =  info.move;
            newBattle.addField('A batalha acabou', `o jogador ${info.battleStatus == EnumBattleStates.MONSTER_VICTORY ? 'perdeu' : `ganhou ${info.monster.experience} de experiência.`}`);
            
            if(info.monster && info.monster.drop) {
                let drops = '';
                for (const drop of info.monster.drop) {
                    drops += `${drop.amount} de ${drop.itemName} \n`;
                }
                newBattle.addField('Foram Dropados', drops);
            }
            this.battle.edit(newBattle);
            return;
        }
        if(info.player) {
            playerRow.value = `HP: ${info.player.currenthp}`;
            actionRow.value =  info.move;
        }
        if(info.monster) {
            monsterRow.value = `HP: ${info.monster.currenthp}`;
            actionRow.value =  info.move;
        }
        this.battle.edit(newBattle);
    }

}

export default ViewBattle