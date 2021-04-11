import { Sequelize } from 'sequelize';

class Connection {
    /** Referencia ao ORM Sequelize */
    public ground : Sequelize;

    constructor() {
        //instância do Sequelize fica guardada na classe que é exportada.
        this.ground = new Sequelize('postgres://postgres:bruno@localhost:5432/rpg');
    }

}
//Não é necessário exportar a classe, 
//mas como eu estou fazendo orientado a objetos, 
//achei que seria melhor ter um objeto para tal
const groudon = new Connection();
module.exports = groudon;