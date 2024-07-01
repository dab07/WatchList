import { Model, DataTypes } from 'sequelize';
import {UUID} from "node:crypto";
import {sequelize} from '../utils/db';

class User extends Model {
    id!: UUID;
    username!: string;
    email!: string;
    password!: string;
    name !: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
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
        },
        name : {
            type: DataTypes.STRING,
            allowNull : false,
        }
    },
    {
        sequelize,
        tableName: 'users', // make sure this matches your actual table name
        timestamps: true, // set to false if your table doesn't have createdAt and updatedAt fields
    }
);

export default User;
