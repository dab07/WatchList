import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class Session extends Model {
    id!: string;
    user_id!: string;
    expires_at!: Date;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

Session.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'sessions',
        timestamps: true,
    }
);

export default Session;
