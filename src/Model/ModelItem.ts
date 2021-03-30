import { DataTypes, Model } from "sequelize";
import ModelBase from "./ModelBase";

class ModelItem extends ModelBase {

    private item;

    constructor() {
        super();
        this.item = this.init();
        
    }
    
    /**
     * @inheritdoc
     */
    async addRecord(info: any) : Promise<any>{
        return await this.item.upsert({
            name: info.name,
            description: info.desc
        })
    }

    /**
     * @inheritdoc
     */
    async getRecord(id: number): Promise<any> {
        return await this.item.findByPk(id);
    }

    /**
     * @inheritdoc
     */
    async getRecordByDescription(desc: string): Promise<any> {
        return await this.item.findOne({
            where : {
                name : desc,
            }
        }); 
    }

    /**
     * @inheritdoc
     */
    init() {
        return this.sequelize.define<Model>('item', {
            iditem : {
                type         : 'SERIAL',
                primaryKey   : true
            },
            name        : {
                type : DataTypes.STRING
            },
            description : {
                type : DataTypes.STRING
            }
        }, 
        {
            timestamps     : false,
            freezeTableName: true
        })
    }

    /**
     * @inheritdoc
     */
    getModel() {
        return this.item;
    }
  
}


module.exports = ModelItem;