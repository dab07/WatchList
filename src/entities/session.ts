import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class Session extends Model {
    id!: string;
    expiresAt!: Date;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

Session.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING, // Assuming userId is UUID
            allowNull: false,
        },
        expiresAt: {
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
