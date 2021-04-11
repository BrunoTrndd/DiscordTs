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
            description: info.description,
            type : info.type,
            value : info.value
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
                type         : DataTypes.INTEGER,
                primaryKey   : true,
                autoIncrement: true,
            },
            name        : {
                type : DataTypes.STRING
            },
            description : {
                type : DataTypes.STRING
            },
            type : {
                type : DataTypes.INTEGER
            },
            value : {
                type : DataTypes.INTEGER
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