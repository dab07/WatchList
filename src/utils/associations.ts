import Media from "../entities/media";
import User from "../entities/user";
import Session from "../entities/session";

const addAssociations = () => {
    User.hasMany(Media, { foreignKey: 'user_id', as: 'media', sourceKey: 'id' });
    Media.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    User.hasMany(Session, { foreignKey: 'user_id', as: 'session', sourceKey: 'id' });
    Session.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
}

export { addAssociations };
