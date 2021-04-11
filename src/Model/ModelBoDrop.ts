const ModelPlayer = require('./ModelPlayer');
const ModelMonster = require('./ModelMonster');
const ModelMonsterDrop = require('./ModelMonsterDrop');
const ModelItemInventory = require('./ModelItemInventory');
const ModelItem = require('../Model/ModelItem');

class ModelBoDrop {

    private player;
    private monster;

    constructor(player, monster) {
        this.player  = player;
        this.monster = monster
    }
    
    /**
     * retorna todos os drops do monstro, e grava os itens no inventario do player
     * @returns Json[]
     */
    async processMonsterDrop() {
        const monsterDrop = new ModelMonsterDrop();
        const inventory = new ModelItemInventory();
        const item = new ModelItem();
        let drops = await monsterDrop.getAllFromMonster({idmonster : this.monster.idmonster});
        let dropped = [];
        for (const drop of drops) {
            const dropping = this.isDropping(drop);
            if(!dropping) {
                continue;
            }
            
            //criar trigger no banco pra isso
            const itemObject = await item.getRecord(drop.iditem);
            dropped.push({itemName : itemObject.name, amount : drop.amount});
            let itemInv = await inventory.getRecord({idplayer: this.player.idplayer, iditem:drop.iditem});
            if(itemInv) {
                itemInv.amount += drop.amount;
                itemInv.save();
                continue;
            }
            await inventory.addRecord({
                iditem   : drop.iditem,
                idplayer : this.player.idplayer,
                amount : drop.amount
            });
        }
        return dropped;
    }

    /**
     * Se o roll for menor ou igual que a chance de drop, o item irá ser adiquirdo pelo player. Ex.:
     * 
     * A chance de drop do item é 60%.
     * O roll recebe um valor aleatorio entre 0 e 1, então multiplicando por 100 o transforma em um numero usavel.
     * Logo, se o roll for até 60, o item é dropado, se for maior que isso é considerado que caiu nos 40% que não iria dropar
     * 
     * @param drop ModelSequelize
     * @returns boolean
     */
    isDropping(drop: any) {
        const roll = Math.random() * 100;
        return roll <= drop.chance;
    }

}

module.exports = ModelBoDrop;