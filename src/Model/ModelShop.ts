import { DataTypes, Model, Op } from 'sequelize';
import ModelBase from './ModelBase';

class Shop extends ModelBase {

    private shop;


    constructor() {
        super();
        this.shop = this.init();
    }

    
    /**
     * @inheritdoc
     */
     async addRecord(info: any): Promise<any> {
        return await this.getModel().upsert({
            idshop : info.idshop,
            name : info.name,
            type : info.type
        });
    }

    /**
     * @inheritdoc
     */
    async getRecord(info: any): Promise<any> {
        return await this.getModel().findOne({
            where: {
                idshop : info.idshop
            }
        });
    }

    /**
     * @inheritdoc
     */
    async getRecordByDescription(desc: string): Promise<any> {
        let shop = await this.getModel().findOne({
            where: {
                name: {
                    [Op.like] : `${desc}`
                }
            }
        });
        return shop;
    }

    
    /**
     * @inheritdoc
     */
     init() {
        return this.sequelize.define<Model>('shop', {
            idshop: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        })
    }

    /**
     * @inheritdoc
     */
     getModel() {
        return this.shop;
    }

}

module.exports = Shop;