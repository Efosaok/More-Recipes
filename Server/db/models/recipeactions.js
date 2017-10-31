module.exports = (sequelize, DataTypes) => {
  const Recipeactions = sequelize.define('Recipeactions', {
    userid: {
      type: DataTypes.UUID,
      allowNull: false,
      reference: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    recipeid: {
      type: DataTypes.UUID,
      allowNull: false,
      reference: {
        model: 'Recipes',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    favourite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    vote: {
      type: DataTypes.ENUM,
      values: ['upvote', 'downvote'],
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  });
  return Recipeactions;
};
