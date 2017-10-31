module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'uncategorised',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  });
  Recipes.associate = (models) => {
    Recipes.belongsTo(models.Users, { as: 'creator' });
    Recipes.belongsToMany(models.Users, { as: 'userActions', through: models.Recipeactions });
  };
  return Recipes;
};
