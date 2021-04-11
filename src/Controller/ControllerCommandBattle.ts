import ViewBattle from "../View/ViewBattle";
import { EnumBattleStates } from "./Enum/EnumBattleStates";
import { ControllerCommand } from "./ControllerBaseCommand";
import { Message } from "discord.js";

const ModelPlayer = require('../Model/ModelPlayer');
const ModelMonster = require('../Model/ModelMonster');
const ModelMonsterStatus = require('../Model/ModelMonsterStatus');
const ModelPlayerStatus = require('../Model/ModelPlayerStatus');
const ModelBoDrop = require('../Model/ModelBoDrop');

class ControllerCommandBattle extends ControllerCommand {

    private modelPlayer;
    private modelMonster;

    constructor(message) {
        super(message);
        this.modelMonster = new ModelMonster();
        this.modelPlayer = new ModelPlayer();
    }

    public static commandsAlias : string[] = ['battle', 'b'];

    /**
     * @inheritdoc
     */
    getDescription(): string {
        return 'Inicia a batalha com os monstros da area que está.'
    }

    /**
     * Busca o monstro, os status dele e o do player, e inicia o loop da batalha.
     * @param args [Message, ['nomeMonstro']]
     * @returns 
     */
    async execute(...args: any): Promise<void> {
        let viewBattle = this.factoryMessage.getViewBattle(args[0], args[1]);
        let currentPlayer = await this.modelPlayer.getRecord({idplayer : args[0].author.id});
        let currentMonster = await this.modelMonster.getRecordByDescription(args[1]); 
        if(currentPlayer.currenthp == 0) {
            this.factoryMessage.getViewError(args[0], currentPlayer).printErrorPlayerIsDead();
            return;
        }
        //Inicio criação status - transferir para FactoryStatus
        let statusPlayer = new ModelPlayerStatus({idplayer : currentPlayer.idplayer});
        // await statusPlayer.prepareModel({idplayer : args[0].author.id})
        let statusMonster = new ModelMonsterStatus({idmonster : currentMonster.idmonster});
        // await statusMonster.prepareModel({idmonster : currentMonster.idmonster});;
        //Fim criação status
        if(!currentMonster) {
            this.factoryMessage.getViewError(args[0], currentMonster).printErrorMonsterNotExists();
            return;
        }
        statusMonster.currenthp = currentMonster.maxhp;
        //start BattleLoop
        await viewBattle.createBattle({player : currentPlayer, monster : currentMonster});
        this.loopBattle(viewBattle, {currentPlayer, statusPlayer, currentMonster, statusMonster}); 
    } 

    private async loopBattle(battleVisual : ViewBattle, status : any) : Promise<void> {
        let battleState = EnumBattleStates.MONSTER_TURN;
        let battleLoop = setInterval(async ()=>{
            switch(battleState){
                case EnumBattleStates.PLAYER_TURN :
                    battleState = await this.executePlayerTurn(battleVisual, status);
                break;
                case EnumBattleStates.MONSTER_TURN :
                    battleState = await this.executeMonsterTurn(battleVisual, status);
                break;
                case EnumBattleStates.BATTLE_ENDED :
                    clearInterval(battleLoop)
                break;
            }
        }, 2000);

    }

    async executeMonsterTurn(battleVisual: ViewBattle, status: any): Promise<EnumBattleStates> {
        let monsterAttack = status.statusMonster.calcAttack();
        let playerHp = status.currentPlayer.currenthp;
        playerHp -= monsterAttack;
        if(playerHp <= 0){
            playerHp = 0;
            battleVisual.editBattle({
                battleStatus : EnumBattleStates.MONSTER_VICTORY,
                move : `${status.currentMonster.name} atacou com Ataque Básico, deu ${monsterAttack} de dano.`,
                player : {
                    playerName : status.currentPlayer.name,
                    currenthp : playerHp
                }
            });
            status.currentPlayer.currenthp = playerHp;
            status.currentPlayer.save();
            return EnumBattleStates.BATTLE_ENDED;
        }
        status.currentPlayer.currenthp = playerHp;
        battleVisual.editBattle({
            battleStatus : EnumBattleStates.MONSTER_TURN,
            move : `${status.currentMonster.name} atacou com Ataque Básico, deu ${monsterAttack} de dano.`,
            player : {
                playerName : status.currentPlayer.name,
                currenthp : playerHp
            }
        });
        return EnumBattleStates.PLAYER_TURN;
    }
    
    async executePlayerTurn(battleVisual: ViewBattle, status: any) : Promise<EnumBattleStates>{
        let playerAttack = status.statusPlayer.calcAttack();
        let monsterHp = status.statusMonster.currenthp;
        monsterHp -= playerAttack;
        if(monsterHp <= 0) {
            monsterHp = 0;
            status.currentPlayer.experience += status.currentMonster.experience;
            let boDrop = new ModelBoDrop(status.currentPlayer, status.currentMonster)
            const drop = await boDrop.processMonsterDrop();
            status.currentPlayer.save();
            battleVisual.editBattle({
                battleStatus : EnumBattleStates.PLAYER_VICTORY,
                move : `${status.currentPlayer.name} atacou com Ataque Básico, deu ${playerAttack} de dano.`,
                monster : {
                    monsterName : status.currentMonster.name,
                    currenthp   : monsterHp,
                    experience  : status.currentMonster.experience,
                    drop : drop
                }
            });
            return EnumBattleStates.BATTLE_ENDED;
        }
        status.statusMonster.currenthp = monsterHp;
        battleVisual.editBattle({
            battleStatus : EnumBattleStates.MONSTER_TURN,
            move : `${status.currentPlayer.name} atacou com Ataque Básico, deu ${playerAttack} de dano.`,
            monster : {
                monsterName : status.currentMonster.name,
                currenthp : monsterHp
            }
        });
        
        return EnumBattleStates.MONSTER_TURN;
    }
    
}

module.exports = ControllerCommandBattle;