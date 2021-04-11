import { EnumItemType } from "../../Controller/Enum/EnumItemType";

const ModelItem          = require('../ModelItem');
const ModelItemInventory = require("../ModelItemInventory");
const ModelItemShop      = require("../ModelItemShop");
const ModelPlayer        = require("../ModelPlayer");
const ModelShop          = require("../ModelShop");
const ModelMonster       = require("../ModelMonster");
const ModelMonsterStatus = require('../ModelMonsterStatus');
const ModelMonsterDrop   = require('../ModelMonsterDrop');
const ModelPlayerStatus  = require('../ModelPlayerStatus');


class DbInit {
    
    private modelItem;
    private modelPlayer;
    private modelShop;
    private modelMonster;
    private modelItemInventory;
    private modelItemShop;
    private modelPlayerStatus;
    private modelMonsterStatus;
    private modelMonsterDrop;

    constructor() {
        this.modelItem          = new ModelItem();
        this.modelPlayer        = new ModelPlayer();
        this.modelShop          = new ModelShop();
        this.modelMonster       = new ModelMonster();
        this.modelItemInventory = new ModelItemInventory();
        this.modelItemShop      = new ModelItemShop();
        this.modelPlayerStatus  = new ModelPlayerStatus();
        this.modelMonsterStatus = new ModelMonsterStatus();
        this.modelMonsterDrop   = new ModelMonsterDrop();
    }
    
    async init() {

    const promisesCreate = [
        await this.modelMonster.getModel().sync({force : true}),
        await this.modelPlayer.getModel().sync({force : true}),
        await this.modelPlayerStatus.getModel().sync({force : true}),
        await this.modelShop.getModel().sync({force : true}),
        await this.modelMonsterStatus.getModel().sync({force : true}),
        await this.modelItem.getModel().sync({force : true}),
        await this.modelItemShop.getModel().sync({force : true}),
        await this.modelItemInventory.getModel().sync({force : true}),
        await this.modelMonsterDrop.getModel().sync({force : true})
    ]

    await Promise.all(promisesCreate);

    //------------------------------------------------------------
    // INICIO CRIAÇÃO DAS FK'S 
    //------------------------------------------------------------
    //Status
    await this.modelPlayerStatus.getModel().belongsTo(this.modelPlayer.getModel(), {foreignKey : 'idplayer'});
    await this.modelMonsterStatus.getModel().belongsTo(this.modelMonster.getModel(), {foreignKey : 'idmonster'});
    //Itens da loja
    await this.modelItemShop.getModel().belongsTo(this.modelShop.getModel(), {foreignKey : 'idshop'});
    await this.modelItemShop.getModel().belongsTo(this.modelItem.getModel(), {foreignKey : 'iditem'});
    //Itens do inventario
    await this.modelPlayer.getModel().belongsToMany(this.modelItem.getModel(), {through : {model : this.modelItemInventory.getModel(), unique : true}, foreignKey : 'idplayer'})
    await this.modelItem.getModel().belongsToMany(this.modelPlayer.getModel(), {through : {model : this.modelItemInventory.getModel(), unique : true}, foreignKey : 'iditem'})
    // await this.modelItemInventory.getModel().belongsTo(this.modelItem.getModel(), {foreignKey : 'iditem'});
    // await this.modelItemInventory.getModel().belongsTo(this.modelPlayer.getModel(), {foreignKey : 'idplayer'});
    //Drops do monstro
    await this.modelMonsterDrop.getModel().belongsTo(this.modelItem.getModel(), {foreignKey : 'iditem'});
    await this.modelMonsterDrop.getModel().belongsTo(this.modelMonster.getModel(), {foreignKey : 'idmonster'});
    //------------------------------------------------------------
    // TERMINO CRIAÇÃO DAS FK'S 
    //------------------------------------------------------------

    const promiseInitItem = [
            await this.modelItem.addRecord({
                name : 'Cobre',
                description : 'Vale como cobre, quase nada.'
            }),
            await this.modelItem.addRecord({
                name : 'Banana',
                description : 'Cura 5 de vida.',
                type : EnumItemType.HEAL_ITEM,
                value : 5
            }),
            await this.modelShop.addRecord({
                name : 'Loja Inicial'
            }),
            await this.modelItemShop.addRecord({
                idshop : 1,
                iditem : 2,
                price : 5,
            })
        ];

        await Promise.all(promiseInitItem);
        
        const promiseInitMonster = [
            this.modelMonster.addRecord({
                name : 'Slime',
                maxhp : 10,
                experience: 5,
            }),
            this.modelMonsterStatus.addRecord({
                idmonster : 1
            }),
            this.modelMonsterDrop.addRecord({
                idmonster : 1,
                iditem: 1,
                chance : 100,
                amount : 10
            })
        ];
        await Promise.all(promiseInitMonster);
    }

}

new DbInit().init();