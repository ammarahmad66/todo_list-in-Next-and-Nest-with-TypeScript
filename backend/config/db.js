import { Sequelize } from "sequelize";
import User from "../models/user.js";


export const sequelize = new Sequelize('postgres://postgres:Compiler88@localhost:8000/User', {
  dialect: 'postgres'
});

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};



