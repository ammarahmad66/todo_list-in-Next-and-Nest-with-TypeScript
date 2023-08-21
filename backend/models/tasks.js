import {sequelize} from '../config/db.js';
import { DataTypes } from 'sequelize';



const Tasks = sequelize.define("tasks", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  importance: {
    type: DataTypes.STRING,
    enum: ["Urgent","Not Urgent"],
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.STRING,
    enum: ["Done","Not Done"],
    defaultValue: "Not Done",
  },
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
});

export default Tasks;
