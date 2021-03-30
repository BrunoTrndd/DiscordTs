import ViewBattle from "../View/ViewBattle";
import { EnumBattleStates } from "./Enum/EnumBattleStates";
import { ControllerCommand } from "./ControllerBaseCommand";
import { Message } from "discord.js";

const ModelPlayer = require('../Model/ModelPlayer');
const ModelMonster = require('../Model/ModelMonster');

class ControllerCommandBattle extends ControllerCommand {

    private modelPlayer;
    private modelMonster;

    constructor(message) {
        super(message);
        this.modelMonster = new ModelMonster();
        this.modelPlayer = new ModelPlayer();
    }

    public static commandsAlias : string[] = ['battle', 'b'];

    getDescription(): string {
        return 'Inicia a batalha com os monstros da area que está.'
    }

    async execute(...args: any): Promise<void> {
        let viewBattle = this.factoryMessage.getViewBattle(args[0], args[1]);
        let currentPlayer = await this.modelPlayer.getRecord({idplayer : args[0].author.id});
        let currentMonster = await this.modelMonster.getRecordByDescription(args[1]);
        if(!currentMonster) {
            this.factoryMessage.getViewError(args[0], currentMonster).printErrorMonsterNotExists();
            return;
        }
        //start BattleLoop
        let battleEmbed = await viewBattle.createBattle(await this.getBattleInfo(args[0], args[1]));
        
        
        // this.loopBattle(battleVisual);
        
        //criar referencia da mensagem de batalha
        //calcular round
    }
    
    async getBattleInfo(message : Message, monsterName : string): Promise<any> {
        let player = 
        
        if(!monster) {
            this.factoryMessage.getViewError(message, monsterName).printErrorMonsterNotExists();
            return;
        }
        player.name = 'bruno';
        let acao = {desc : 'ataque de player'};
        return {player,monster, acao}
    }

    private async loopBattle(battleVisual : ViewBattle) : Promise<void> {
        let battleState;
        // if(this.modelMonster.getSpeed() > this.modelPlayer.getSpeed()) {
        //     battleState = EnumBattleStates.MONSTER_TURN;
        // } else {
        //     battleState = EnumBattleStates.PLAYER_TURN;
        // }
        battleState = EnumBattleStates.PLAYER_TURN;
    }


}
 
module.exports = ControllerCommandBattle;