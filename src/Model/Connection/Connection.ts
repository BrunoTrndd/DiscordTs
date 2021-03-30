import { Sequelize } from 'sequelize';

class Groudon {

    public ground : Sequelize;

    constructor() {
        this.ground = new Sequelize('postgres://postgres:bruno@localhost:5432/rpg');
    }

}

const groudon = new Groudon();

module.exports = groudon;