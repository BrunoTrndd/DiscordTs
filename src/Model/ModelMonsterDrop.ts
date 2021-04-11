import { DataTypes } from "sequelize";
import ModelBase from "./ModelBase";

class ModelMonsterDrop extends ModelBase {

    private monsterDrop;


    constructor() {
        super();
        this.monsterDrop = this.init();
    }


    /**
     * @inheritdoc
     */
    async addRecord(info: any): Promise<any> {
        return await this.monsterDrop.upsert({
            idmonster : info.idmonster,
            iditem : info.iditem,
            chance : info.chance,
            amount : info.amount
        });
    }
    
    /**
     * @inheritdoc
     */
    async getRecord(info: any): Promise<any> {
        return await this.monsterDrop.findOne({
            where : {
                idmonster : info.idmonster,
                iditem    : info.iditem
            }
        });
    }

    async getAllFromMonster(info : any) : Promise<any> {
        return await this.monsterDrop.findAll({
            where : {
                idmonster : info.idmonster
            }
        })
    }

    /**
     * @inheritdoc
     */
    async getRecordByDescription(desc: string): Promise<any> {
        return await '';
    }

    /**
     * @inheritdoc
     */
    init() {
        return this.sequelize.define('monsterdrop', {
            idmonster : {
                type : DataTypes.INTEGER
            },
            iditem : {
                type : DataTypes.INTEGER
            },
            chance : {
                type : DataTypes.DECIMAL
            },
            amount : {
                type : DataTypes.INTEGER
            }
        }, 
        {
            timestamps : false,
            freezeTableName : true
        });
    }

    /**
     * @inheritdoc
     */
    getModel() {
        return this.monsterDrop;
    }

}

module.exports = ModelMonsterDrop;