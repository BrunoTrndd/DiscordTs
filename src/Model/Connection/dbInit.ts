const ModelItem          = require('../ModelItem');
const ModelItemInventory = require("../ModelItemInventory");
const ModelItemShop      = require("../ModelItemShop");
const ModelPlayer        = require("../ModelPlayer");
const ModelShop          = require("../ModelShop");
const ModelMonster       = require("../ModelMonster");
const ModelMonsterStatus = require('../ModelMonsterStatus');
const ModelPlayerStatus  = require('../ModelPlayerStatus');



class DbInit {

    async init() {
        let modelItem          = new ModelItem();
        let modelItemInventory = new ModelItemInventory();
        let modelItemShop      = new ModelItemShop();
        let modelPlayer        = new ModelPlayer();
        let modelShop          = new ModelShop();
        let modelPlayerStatus  = new ModelPlayerStatus();
        let modelMonster       = new ModelMonster();
        let modelMonsterStatus = new ModelMonsterStatus();
        // modelPlayerStatus.getModel().belongsTo(modelPlayer.getModel());
        // modelPlayerStatus.getModel().belongsTo(modelStatus.getModel());
        // modelMonsterStatus.getModel().belongsTo(modelMonster.getModel());
        // modelMonsterStatus.getModel().belongsTo(modelStatus.getModel());

        // modelMonster.getModel().sync({force : true});
        // modelPlayerStatus.getModel().sync({force : true});
        // modelMonsterStatus.getModel().sync({force : true});
        // modelMonster.addRecord({
        //     name : 'Slime',
        //     maxhp : 10
        // })
        
        // modelPlayerStatus.addRecord({
        //     idplayer : '216746750327652353',
        //     strenght: 10,
        //     agility: 10,
        //     dexterity: 10,
        //     intelligence: 10,
        //     aspd : 10,
        //     attack : 10,
        //     accuracy : 10,
        //     magic: 10,
        //     defense: 10,
        //     magicdefense: 10
        // })
        
    }

}


new DbInit().init();