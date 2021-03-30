import { Model, Sequelize } from 'sequelize';
import InterfaceModelRecord from './InterfaceModelRecord';

abstract class ModelBase implements InterfaceModelRecord  {
 
    public sequelize : Sequelize;

    constructor() {
        this.sequelize = require('./Connection/Connection').ground;
    }
    
    /**
     * @inheritdoc
     */
    abstract addRecord(info: any) : Promise<any>;
    
    /**
     * @inheritdoc
     */
    abstract getRecord(info: any): Promise<any>;

    /**
     * @inheritdoc
     */
    abstract getRecordByDescription(desc: string): Promise<any>;

    /**
     * @inheritdoc
     */
    abstract init() : any;

    /**
     * @inheritdoc
     */
    abstract getModel() : any;

 
}

export default ModelBase;