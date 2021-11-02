const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class socialUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			socialUser.hasOne(models.userDetail);
			socialUser.hasMany(models.address);
		}
	}
	socialUser.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
				autoIncrement: false,
				field: "social_user_id",
			},
			displayName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			provider: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			}
		},
		{
			sequelize,
			modelName: "socialUser",
			underscored: true,
		}
	);
	return socialUser;
};
