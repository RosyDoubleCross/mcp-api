"use strict";

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "Video",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                notEmpty: true
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true
            },
            length: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            classMethods: {
                associate: function(db) {
                    db.Video.belongsToMany(
                        db.Category,
                        {through: "VideoCategory"}
                    );
                }
            }
        }
    );
};

