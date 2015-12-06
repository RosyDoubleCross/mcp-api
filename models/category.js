"use strict";

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "Category",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                notEmpty: true
            }
        }, {
            classMethods: {
                associate: function(db) {
                    db.Category.belongsToMany(
                        db.Video,
                        {through: "VideoCategory"}
                    );
                }
            }
        }
    );
};

