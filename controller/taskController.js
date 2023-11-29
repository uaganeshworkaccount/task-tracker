const Tasks = require("../model/Tasks");
const fs = require("fs");
const path=require("path")
// Creating Task
exports.createTask = async (req, res) => {
  try {
    console.log("Entering Controller");
    //For Getting Task ID From File
    
    let data = fs.readFileSync("./controller/value.txt", { encoding: "utf8", flag: "r" });
    let increment = parseInt(data) + 1;
    console.log("incremented to", increment);
    fs.writeFile("./controller/value.txt", increment.toString(), (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
    const adddata={task_created_id:increment.toString()}
   
    const combineddata={...req.body,...adddata}
     console.log("Req body",req.body)
     console.log("combined data",combineddata);
    const orders = await Tasks.create(combineddata);
    res.status(201).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

//------------------------------------------------------//

//Getting Task List
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get Task By Id
exports.getTasksById = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findById(id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Invalid Request" });
  }
};

//------------------------------------------------------------------------------------

//Update Task By ID
exports.updateTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const options = { new: true };
    const tasks = await Tasks.findByIdAndUpdate(id, req.body, options);
    if (!tasks) {
      return res
        .status(404)
        .json({ message: `cannot find any Task with id:${id}` });
    } else {
      return res.status(200).json(tasks);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//-------------------------------------------------------------

//Cancel Tasks
exports.cancelTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findByIdAndDelete(id);
    if (!tasks) {
      return res.status(400).json({ message: `order with ${id} not found` });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get Task List By Username
exports.getTasksByUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    console.log(user_id);
    const tasks = await Tasks.find({ user_id }).exec();

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No Tasks found for this username." });
    }

    let length = tasks.length;
    let pendingtask = [];
    for (i = 0; i < length; i++) {
      if (tasks[i].status != "Completed") {
        pendingtask.push(tasks[i]);
      }
    }
    return res.status(200).json(pendingtask);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get Task Notification By User
exports.getTasksNotification = async (req, res) => {
  try {
    const user_id = req.params.id;
    // console.log(user_id);
    const tasks = await Tasks.find({ user_id }).exec();

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No Tasks found for this username." });
    }

    let length = tasks.length;
    let tonotify = [];
    for (i = 0; i < length; i++) {
      if (tasks[i].notification == "1") {
        tonotify.push(tasks[i]);
      }
    }
    return res.status(200).json(tonotify);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Completed Task List By User Id
exports.getCompletedTaskByUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    // console.log(user_id);
    const tasks = await Tasks.find({ user_id }).exec();

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No Tasks found for this username." });
    }

    let length = tasks.length;
    let completedtask = [];
    for (i = 0; i < length; i++) {
      if (tasks[i].status == "Completed") {
        completedtask.push(tasks[i]);
      }
    }
    return res.status(200).json(completedtask);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get Task List of All Users

exports.getCompletedTaskAllUsers = async (req, res) => {
  try {
    const tasks = await Tasks.find({ status: "Completed" });
    // console.log(tasks);
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No Completed Task Found" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    // res.status(400).json({ message: error.message });
  }
};

//Get Uncompleted Tas List FOr Admin
//Get Task List of All Users

exports.getUncompletedTaskAllUsers = async (req, res) => {
  try {
    const tasks = await Tasks.find({ status: { $ne: "Completed" } });
    // console.log(tasks);
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No Completed Task Found" });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    // res.status(400).json({ message: error.message });
    console.log(error.message)
  }
};

exports.searchTask = async (req, res) => {
  try {
    const findData = req.query.findData;
    const query = {
      $or: [
        { task_title: { $regex: new RegExp(findData, "i") } },
        { status: { $regex: new RegExp(findData, "i") } },
        { task_description: { $regex: new RegExp(findData, "i") } },
        { priority_level: { $regex: new RegExp(findData, "i") } },
        { assigned_to: { $regex: new RegExp(findData, "i") } },
      ],
    };

    const results = await Tasks.find(query);

    res.json(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Insert Comment To the Task
exports.insertComment = async (req, res) => {
  try {
    const task_id = req.params.id;

    console.log("task id", task_id);

    let comment = req.body.message;
    console.log("comment", comment);
    const result = await Tasks.updateOne(
      { _id: task_id },
      { $push: { comments: comment } }
    );
    console.log(result);
    if (result.modifiedCount > 0) {
      console.log("Value inserted successfully");
      return res.status(200).json({ message: "Data updated successfully" });
    } else {
      console.log("No document modified");
      return res.status(500).json({ message: "No data modified" });
    }

    return res.status(200).json(completedtask);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
