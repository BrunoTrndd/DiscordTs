import { DataTypes, Model } from 'sequelize';
import ModelBase from './ModelBase';

class ModelItemShop extends ModelBase{

    private itemShop;

    constructor() {
        super();
        this.itemShop = this.init();
    }

    /**
     * @inheritdoc
     */
    async addRecord(info: any): Promise<any> {
        return await this.itemShop.upsert({
            iditem : info.iditem,
            idshop : info.idshop,
            price  : info.price 
        });
    }

    /**
     * @inheritdoc
     */
    async getRecord(info: any): Promise<any> {
        return await this.itemShop.findOne({
            where : {
                iditem : info.idtem,
                idshop : info.idshop
            }
        })
    }

    /**
     * @inheritdoc
     */
    async getRecordByDescription(desc: string): Promise<any > {
        throw new Error('Method not implemented.');
    }

    /**
     * @inheritdoc
     */
    getModel() {
        return this.itemShop;
    }

    /**
     * @inheritdoc
     */
    init() {
        return this.sequelize.define<Model>('itemshop', {
            iditem : {                         
                type         : DataTypes.INTEGER, 
                primaryKey   : true,
                autoIncrement: true,
            },
            idshop : {
                type         : DataTypes.INTEGER
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        })
    }

    /**
     * Busca todos os itens referentes ao ID da Loja passado por parâmetro
     * @param idShop 
     * @returns Sequelize.Model[]
     */
    async getAllFromShop(idShop : number) {
        return await this.itemShop.findAll({
            where : {
                idshop: idShop
            }
        })
    }

    /**
     * Busca o preço do item referente ao ID passado por parâmetro
     * @param idItem 
     * @returns Sequelize.Model
     */
    async getItemPrice(idItem : number) {
        let item =  await this.getModel().findOne({
            where: {
                iditem: idItem
            }
        });
        return item.getDataValue('price');
    }

}

module.exports = ModelItemShop;