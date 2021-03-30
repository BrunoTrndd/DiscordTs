import { DataTypes } from "sequelize";
import ModelBase from "./ModelBase";

class ModelMonsterDrop extends ModelBase {

    private monsterDrop;

    /**
     * @inheritdoc
     */
    async addRecord(info: any): Promise<any> {
        return await this.monsterDrop.upsert({
            idmonster : info.idmonster,
            iditem : info.iditem,
            chance : info.chance
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
                type : DataTypes.INTEGER,
            },
            chance : {
                type : DataTypes.DECIMAL
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