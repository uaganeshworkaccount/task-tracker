const express=require('express');
const taskroutes=express.Router();
const taskController=require('../controller/taskController')
const isAuthUser=require("../middleware/userauth");

taskroutes.post('/tasks',taskController.createTask);
taskroutes.get('/tasks',taskController.getTasks);
taskroutes.get('/tasks/:id',taskController.getTasksById);
taskroutes.put('/tasks/:id',taskController.updateTasks);
taskroutes.delete('/tasks/:id',taskController.cancelTasks);
//Get Pending and On Progress Task of Specific User
taskroutes.get('/tasks/user/:id',isAuthUser,taskController.getTasksByUser);

//Get Newly Assigned Task Where Notification Value is 1
taskroutes.get('/tasks/notification/:id',taskController.getTasksNotification);

//Get Completed Task List of Specific User
taskroutes.get('/tasks/user/completed/:id',taskController.getCompletedTaskByUser);

//Get Completed Task List of All Users
taskroutes.get('/completed/task',taskController.getCompletedTaskAllUsers);

//Get Uncompleted Task List of All Users
taskroutes.get('/uncompleted/task',isAuthUser,taskController.getUncompletedTaskAllUsers);

//Search Task
taskroutes.get('/task/search',taskController.searchTask);

//insert comment
taskroutes.post('/task/comment/:id',taskController.insertComment);

module.exports=taskroutes;