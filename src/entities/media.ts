import {Model, DataTypes} from "sequelize";
import {sequelize} from "../utils/db";
import {MediaType, SeriesProgress, SeriesProperties, SeriesStatus, WatchStatus} from "../types/media";

class Media extends Model {
    id!: string;
    user_id!: string;
    tmdb_id!: string;
    mediaType!: MediaType;
    series_status!: SeriesStatus;
    watch_status!: WatchStatus;
    title!: string;
    rating?: number;
    description?: string;
    series_properties?: SeriesProperties;
    series_progress?: SeriesProgress;
}
Media.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tmdb_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        series_status: {
            type: DataTypes.ENUM(...(Object.values(SeriesStatus))),
        },
        watch_status: {
            type: DataTypes.ENUM(...(Object.values(WatchStatus))),
        },
        mediaType: {
            type: DataTypes.ENUM(...(Object.values(MediaType))),
        },
        series_properties: {
            type: DataTypes.JSON,
        },
        series_progress: {
            type: DataTypes.JSON,
        },
    },
    {
        sequelize,
        tableName: 'media',
    }
);

export default Media;
