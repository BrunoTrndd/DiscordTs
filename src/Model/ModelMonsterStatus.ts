import { DataTypes } from "sequelize";
import ModelBaseStatus from "./ModelBaseStatus";

class ModelMonsterStatus extends ModelBaseStatus {
    
    private monsterStatus;

    constructor(info : any) {
        super();
        this.monsterStatus = this.init();
        if(info){
            this.status = this.prepareModel(info);        
        }
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
            vitality: info.vitality,
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

    async getRecordByDescription(info : any) { }

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
                defaultValue : 1,
                allowNull : false,
            },
            agility: {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            dexterity: {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            intelligence: {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            aspd : {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            attack : {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            accuracy : {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            magic: {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            vitality: {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            defense: {
                type: DataTypes.INTEGER,
                defaultValue : 1,
                allowNull : false,
            },
            magicdefense: {
                type: DataTypes.INTEGER,
                defaultValue : 1,
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

    /**
     * 
     */
    calcAttack() {
        return Math.round(this.status.strenght * 1.5);
    }

    /**
     * @inheritdoc
     */
    calcAgility() {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    calcAspd() {
        throw new Error("Method not implemented.");
    }
    
    /**
     * @inheritdoc
     */
    calcDexterity() {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    calcAccuracy() {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    calcIntelligence() {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    calcMagicAttack() {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    calcDefense() {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    calcMagicDefense() {
        throw new Error("Method not implemented.");
    }

}

module.exports = ModelMonsterStatus;