const mongoose=require('mongoose');

const tasksSchema=mongoose.Schema({
    task_title:{
        type:String,
        required:[true,"Enter Task Title"]
    },

    task_description:{
        type:String,
    
        required:[true,"Enter Task Description"]
    },

    due_date:{
        type:Date,
        required:[true,"Enter Due Date"],
    },

    priority_level:{
        type:String,
        required:[true,"Enter Priority Level"]
    },
    
    status:{

        type:String,
        default:"Pending",
        required:[true,"Enter Status"]

    },
    assigned_to:{

        type:String,
        default:"Not Assigned",
        required:[true,"Enter Assigned Person"]

    },
    created_by:{
        type:String,
        required:[true,"Enter Created Person"]
    },
    user_id:{
        type:String,
        required:[true,"Enter User ID String"]
    },
    notification:{
        type:String,
        default:"1",
        required:[true,"Enter Notification"]
    },
    assigned_date:{
        type:Date,
        default:Date.now,
    },
    completed_date:{
        type:String,
        default:" ",
    },
    comments:{
        type:[{
            type:String
        }],
       
    },
    task_created_id:{
        type:String,
        required:[true,"Enter Task Created ID"]
    },

},
{
         timestamps:false,
        versionKey:false
     
}


)


const Tasks=mongoose.model('Tasks',tasksSchema);

module.exports=Tasks;