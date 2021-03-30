import { DataTypes } from "sequelize";
import ModelBase from "./ModelBase";

class ModelMonsterStatus extends ModelBase{

    private monsterStatus;

    constructor() {
        super();
        this.monsterStatus = this.init();
    }

    /**
     * @inheritdoc
     */
    async addRecord(info: any): Promise<any> {
        return await this.monsterStatus.upsert({
            idmonster : info.idmonster,
            strenght: info.strenght,
            agility: info.agility,
            dexterity: info.dexterity,
            intelligence: info.intelligence,
            aspd : info.aspd,
            attack : info.attack,
            accuracy : info.accuracy,
            magic: info.magic,
            defense: info.defense,
            magicdefense: info.magicdefense
        });
    }

    /**
     * @inheritdoc
     */
    async getRecord(info: any): Promise<any> {
        return await this.monsterStatus.findOne({
            where : {
                idmonster : info.idmonster
            }
        });
    }

    /**
     * @inheritdoc
     */
    async getRecordByDescription(desc: string): Promise<any> {
        
    }

    /**
     * @inheritdoc
     */
    init() {
        return this.sequelize.define('monsterstatus', {
            idmonster : {
                type : DataTypes.INTEGER,
                primaryKey : true,
            },
            strenght: {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            agility: {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            dexterity: {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            intelligence: {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            aspd : {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            attack : {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            accuracy : {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            magic: {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            defense: {
                type: DataTypes.INTEGER,
                allowNull : false,
            },
            magicdefense: {
                type: DataTypes.INTEGER,
                allowNull : false,
            }
        }, 
        {
            timestamps : false,
            freezeTableName : true
        })
    }

    /**
     * @inheritdoc
     */
    getModel() {
        return this.monsterStatus;
    }

}

module.exports = ModelMonsterStatus;