const User = require('./User');
const Pet = require('./Pet');
const PlayDate = require('./PlayDate');

PlayDate.belongsToMany(Pet, { through: 'playdate_pets' });
Pet.belongsToMany(PlayDate, { through: 'playdate_pets' });

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

PlayDate.belongsTo(User, {
  foreignKey: 'user_id'
});

// PlayDate.belongsTo(Pet, {
//   foreignKey: 'pet_id'
// });

User.hasMany(PlayDate, {
    foreignKey: 'user_id'
});

User.hasMany(Pet, {
    foreignKey: 'user_id'
});

// Pet.hasMany(PlayDate, {
//     foreignKey: 'pet_id'
// });

module.exports = { User, Pet, PlayDate};