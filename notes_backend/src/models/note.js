const { DataTypes } = require('sequelize');

/**
 * Note model definition for Sequelize.
 */
const defineNoteModel = (sequelize) =>
  sequelize.define('Note', {
    // PUBLIC_INTERFACE
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Primary key for notes'
    },
    // PUBLIC_INTERFACE
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Title of the note'
    },
    // PUBLIC_INTERFACE
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Content/body of the note'
    },
    // PUBLIC_INTERFACE
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: 'Date when note was created'
    },
    // PUBLIC_INTERFACE
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: 'Date when note was last updated'
    }
  }, {
    tableName: 'notes'
  });

module.exports = defineNoteModel;
