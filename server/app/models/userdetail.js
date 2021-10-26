const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class userDetail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			userDetail.belongsTo(models.user, {
				foreignKey: "user_id",
				as: "userId",
			});
		}
	}
	userDetail.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				field: "user_id",
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			gender: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			age: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			height: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			weight: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			congenitalDisease: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					notEmpty: false,
				},
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					check: (value) => {
						if (!/^[0][689]\d{8}/.test(value)) {
							throw new Error(
								"กรุณากรอก เบอร์โทรศัพท์ ให้ถูกต้อง"
							);
						} else return true;
					},
				},
			},
		},
		{
			sequelize,
			modelName: "userDetail",
			underscored: true,
		}
	);
	return userDetail;
};
