import { DataTypes, Model } from "sequelize";
import ModelBase from "./ModelBase";

class ModelPlayerStatus extends ModelBase {

    private playerStatus;
    

    constructor() {
        super()
        this.playerStatus = this.init();
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
    async getRecordByDescription(desc: string): Promise<any> {
        // return await this.playerStatus.findOne({
        //     where : {
        //         name : desc
        //     }
        // });
    }

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
        });          
    }

    /**
     * @inheritdoc
     */
    getModel() {
        return this.playerStatus;
    }

}

module.exports = ModelPlayerStatus;