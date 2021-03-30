import ModelBase from './ModelBase';
import { DataTypes, Model } from 'sequelize';

class ModelStatus extends ModelBase {

    private status;


    constructor() {
        super();
        this.status = this.init();
    }


    /**
     * @inheritdoc
     */
     async addRecord(info: any) {
        return await this.status.upsert({
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
        return await this.status.findByPk(info.idstatus);
    }

    /**
     * @inheritdoc
     */  
    async getRecordByDescription(desc: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    
    /**
     * @inheritdoc
     */
     init() : any {
        return this.sequelize.define<Model>('status', {
            idstatus: {
                type : 'SERIAL',

                primaryKey : true
            },
            strenght: {
                type: DataTypes.INTEGER,
            },
            agility: {
                type: DataTypes.INTEGER,
            },
            dexterity: {
                type: DataTypes.INTEGER,
            },
            intelligence: {
                type: DataTypes.INTEGER,
            },
            aspd : {
                type: DataTypes.INTEGER,
            },
            attack : {
                type: DataTypes.INTEGER,
            },
            accuracy : {
                type: DataTypes.INTEGER,
            },
            magic: {
                type: DataTypes.INTEGER,
            },
            defense: {
                type: DataTypes.INTEGER,
            },
            magicdefense: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });
    }

    /**
     * @inheritdoc
     */
     getModel() : any {
        return this.status;
    }

}

module.exports = ModelStatus;