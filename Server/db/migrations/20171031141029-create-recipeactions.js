module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipeactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userid: {
        type: Sequelize.UUID,
        allowNull: false,
        reference: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      recipeid: {
        type: Sequelize.UUID,
        allowNull: false,
        reference: {
          model: 'Recipes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      favourite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      vote: {
        type: Sequelize.ENUM,
        values: ['upvote', 'downvote'],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipeactions');
  },
};
