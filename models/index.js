const Owner = require('./Owner');
const Pet = require('./Pet');
const PlayDate = require('./PlayDate');

Pet.hasMany(Owner, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE'
});

Owner.belongsTo(Pet, {
  foreignKey: 'owner_id'
});

Owner.belongsTo(PlayDate, {
    foreignKey: 'owner_id'
  });

Owner.hasMany(PlayDate, {
    foreignKey: 'owner_id'
  });

module.exports = { Owner, Pet, PlayDate};