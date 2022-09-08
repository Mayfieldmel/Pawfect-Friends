const {Model, DataTypes, Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const Image = sequelize.define('image', {
    image_id: {
		type: Selizeque.INTEGER
	},
	// image_type: {
	// 	type: Sequelize.STRING,
	// },
	image: {
		type: Sequelize.BLOB('long')
	},
	// image_size: {
	// 	type: Sequelize.INTEGER
	// },
	image_name: {
		type: Sequelize.STRING
	}
});