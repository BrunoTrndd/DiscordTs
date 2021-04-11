import { DataTypes, Model } from "sequelize"; 
import ModelBaseStatus from "./ModelBaseStatus";

class ModelPlayerStatus extends ModelBaseStatus {
    
    private playerStatus;
    

    constructor(info : any) {
        super();
        this.playerStatus = this.init();
        if(info) {
            this.status = this.prepareModel(info);
        }
    }
    
    /**
     * @inheritdoc
     */
    async addRecord(info: any): Promise<any> {
        return await this.playerStatus.upsert({
            idplayer : info.idplayer,
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
        return await this.playerStatus.findOne({
            where : {
                idplayer : info.idplayer
            }
        });
    }

    /**
     * @inheritdoc
     */
    async getRecordByDescription(info: any) {}
    
    /**
     * @inheritdoc
     */
    init() {
        return this.sequelize.define<Model>('playerstatus',{
            idplayer : {
                type: DataTypes.STRING,
                primaryKey: true
            },
            strenght: {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 3,
            },
            agility: {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            dexterity: {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            intelligence: {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            aspd : {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            attack : {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            accuracy : {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            magic: {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            vitality: {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            defense: {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
            },
            magicdefense: {
                type: DataTypes.INTEGER,
                allowNull : false,
                defaultValue: 1,
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
        return this.playerStatus;
    }

    /**
     * 
     */
    calcAttack() {
        return this.status.strenght;
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

module.exports = ModelPlayerStatus;