module.exports = (sequelize, Sequelize) => {
  const NewMetrics = sequelize.define("new_metrics", {
    name: {
      type: Sequelize.STRING
    },
    new_name: {
      type: Sequelize.STRING
    },
    platform_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'platforms', // Assuming your Category model is named 'Category'
        key: 'id'
      }
    },
    section_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'sections', // Assuming your Category model is named 'Category'
        key: 'id'
      }
    },
  });

  NewMetrics.associate = function(models) {
    NewMetrics.belongsTo(models.Platform, { foreignKey: 'platform_id', as: 'platforms' });
    NewMetrics.belongsTo(models.Section, { foreignKey: 'section_id', as: 'sections' });
  };

  return NewMetrics;
};