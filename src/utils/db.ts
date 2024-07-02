import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('node_proj', 'root', 'test@1234', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
        await sequelize.sync(); // Ensure database synchronization without force: true
    } catch (e) {
        console.error('Error authenticating the database connection:', e);
    }
}

export { connectDatabase, sequelize };
