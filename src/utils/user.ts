import { Model, DataTypes } from 'sequelize';
import {UUID} from "node:crypto";
import {sequelize} from './db';

class User extends Model {
    public id!: UUID;
    public username!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'users', // make sure this matches your actual table name
        timestamps: true, // set to false if your table doesn't have createdAt and updatedAt fields
    }
);

export default User;
