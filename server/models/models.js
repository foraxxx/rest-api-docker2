import sequelize from '../db.js'
import {DataTypes} from "sequelize"

const Task = sequelize.define("Task", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.TEXT, allowNull: false},
  deadline: {type: DataTypes.DATEONLY, allowNull: false},
})

const TaskStatus = sequelize.define("TaskStatus", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false, unique: true},
})

TaskStatus.hasMany(Task)
Task.belongsTo(TaskStatus, { foreignKey: 'TaskStatusId', as: 'status' })

export { Task, TaskStatus }