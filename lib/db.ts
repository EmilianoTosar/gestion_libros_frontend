import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("localhost", "postgres", "adoquin6", {
	host: "libros",
	dialect: "postgres",
});

export default sequelize