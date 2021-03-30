import { DataTypes } from "sequelize";
import ModelBase from "./ModelBase";

class ModelMonster extends ModelBase {

    private monster;

    constructor() {
        super();
        this.monster = this.init();
    }

    /**
     * @inheritdoc
     */
    async addRecord(info: any): Promise<any> {
        return await this.monster.upsert({
            name : info.name,
            maxhp: info.maxhp,
            experience: info.experience
        });
    }

    /**
     * @inheritdoc
     */
    async getRecord(info: any): Promise<any> {
        return await this.monster.findByPk(info.idmonster);
    }

    /**
     * @inheritdoc
     */
    async getRecordByDescription(desc: string): Promise<any> {
        return await this.monster.findOne({
            where : {
                name : desc
            }
        })
    }

    /**
     * @inheritdoc
     */
    init() {
        return this.sequelize.define('monster',{
            idmonster : {
                type : 'SERIAL',
                primaryKey : true,
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false,
            },
            experience : {
                type : DataTypes.INTEGER,
                allowNull : false,
            },
            maxhp : {
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
        return this.monster;
    }

}

module.exports = ModelMonster;