import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('node_proj', 'root', 'test@1234', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306
});

export { sequelize };
