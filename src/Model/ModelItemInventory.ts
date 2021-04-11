import { DataTypes, Model } from 'sequelize';
import ModelBase from './ModelBase';
const ModelItem = require('./ModelItem');

class ModelItemInventory extends ModelBase {

    private itemInventory;
    
    constructor() {
        super();
        this.itemInventory = this.init();
    }

    /**
     * @inheritdoc
     * 
    async addItemToInventory (item : any, player : any, amount : number) {
    };
     */
    async addRecord(info: any): Promise<any> {
        
        console.log(info);
        
        let itemInventory = await this.itemInventory.findOne({
            where: {idplayer: info.idplayer, iditem: info.iditem}
        });
    
        if(itemInventory) {
            itemInventory.setDataValue('amount', itemInventory.getDataValue('amount') + info.amount);
            return await itemInventory.save();
        }
    
        return await this.getModel().upsert({
            idplayer: info.idplayer,
            iditem  : info.iditem,
            amount  : info.amount,
        });
    }

    /**
     * @inheritdoc
     */
    async getRecord(info: any): Promise<any> {
        return this.itemInventory.findOne({
            where :{
                idplayer : info.idplayer,
                iditem   : info.iditem
            }
        });
    }

    /**
     * @inheritdoc
     */
    async getRecordByDescription(desc: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    init() {
        return this.sequelize.define<Model>('iteminventory', {
            iditem: DataTypes.INTEGER,
            idplayer: DataTypes.STRING,
            amount  : DataTypes.INTEGER
        }, 
        {
            timestamps: false,
            freezeTableName: true
        });
    }

    /**
     * @inheritdoc
     */
    getModel() : any{
        return this.itemInventory;
    }

    async getAllFromPlayer (idplayer : string) {
        let response = [];
        let itensInv = await this.itemInventory.findAll({
            where: {idplayer: idplayer},
        });
        let modelItem = new ModelItem();
        for (const itemInv of itensInv) {
            let item = await modelItem.getRecord(itemInv.dataValues.iditem);
            response.push({
                name : item.dataValues.name,
                amount : itemInv.dataValues.amount,
                description : item.dataValues.description
            })
        }

        return response;
    };

    async getMoneyFromPlayer(idPlayer : string) {
        let item = await new ModelItem().getRecordByDescription('Cobre');
        return await this.getModel().findOne({
            where: {
                idplayer: idPlayer,
                iditem  : item.iditem
            }
        })
    }

}

module.exports = ModelItemInventory;