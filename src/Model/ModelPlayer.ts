import { DataTypes, Model } from "sequelize";
import ModelBase from "./ModelBase";

class ModelPlayer extends ModelBase {

    private player;

    constructor() {
        super()
        this.player = this.init();
    }
    
    /**
     * @inheritdoc
     */
    async addRecord(info: any): Promise<any> {
        return await this.player.upsert({
            idplayer : info.idplayer,
            name     : info.name,
            maxhp    : info.maxhp,
            currenthp: info.maxhp
        });
    }

    /**
     * @inheritdoc
     */
    async getRecord(info: any): Promise<any> {
        return await this.player.findOne({
            where : {
                idplayer : info.idplayer
            }
        }
        );
    }
    
    /**
     * @inheritdoc
     */
    async getRecordByDescription(desc: string): Promise<any> {
        return await this.player.findOne({
            where : {
                name : desc
            }
        });
    }

    /**
     * @inheritdoc
     */
    init() {
        return this.sequelize.define<Model>('player',{
            idplayer : {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name : {
                type : DataTypes.STRING,
                allowNull : false,
            },
            maxhp : {
                type : DataTypes.INTEGER,
                defaultValue : 10,
            },
            currenthp : {
                type : DataTypes.INTEGER,
                defaultValue : 10,
            },
            level : {
                type : DataTypes.INTEGER,
                defaultValue : 1,
            },
            experience : {
                type : DataTypes.INTEGER,
                defaultValue : 0,
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
        return this.player;
    }

    /**
     * A partir do ID do player, busca no banco e retorna seu nome
     * @param playerId 
     * @returns string
     */
    async getPlayerName(playerId : string) {
        let player = await this.getModel().findOne({
            where : {
                idplayer: playerId
            }
        });
        return player.getDataValue('name');
    }

}

module.exports = ModelPlayer;