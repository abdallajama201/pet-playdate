const User = require('./User');
const Pet = require('./Pet');
const PlayDate = require('./PlayDate');

PlayDate.belongsToMany(User, { through: 'playdate_users' });
User.belongsToMany(PlayDate, { through: 'playdate_users' });

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

PlayDate.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(PlayDate, {
    foreignKey: 'user_id'
});

User.hasMany(Pet, {
    foreignKey: 'user_id'
});

module.exports = { User, Pet, PlayDate};