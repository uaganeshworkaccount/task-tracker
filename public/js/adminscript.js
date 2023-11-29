//Create Task Popup Handling
function invokePopup() {
  var popup = document.getElementById("popup");
  var closePopupButton = document.getElementById("closePopup");
  popup.style.display = "block";

  closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
  });


}

//Create Task Function
function createTaskDetails() {
  const tasktitle = document.getElementById("tasktitle").value;
  const taskdescription = document.getElementById("taskdescription").value;
  const duedate = document.getElementById("duedate").value;

  const isValid = isDateValid(duedate);

  if (isValid) {
    console.log("Entered date is valid.");
  } else {
    console.log("Due date should be greater than today's date.");
    let content = "<p>Due date should be greater than today's date!</p>";
    document.getElementById("errormessage").innerHTML = content;
    return false;
  }

  function isDateValid(inputDate) {
    const enteredDate = new Date(inputDate);
    const currentDate = new Date();
    return enteredDate > currentDate;
  }

  console.log("Due Date=", duedate);

  const prioritylevel = document.getElementById("priority").value;
  const assignedto = document.getElementById("users").value;

  if (
    tasktitle == "" ||
    taskdescription == "" ||
    duedate == "" ||
    prioritylevel == "" ||
    assignedto == ""
  ) {
    console.log("Fill All the Fields");
    let content = "<p>Fill All The Fields !</p>";
    document.getElementById("errormessage").innerHTML = content;
    return false;
  }



  console.log(tasktitle, taskdescription, duedate, prioritylevel, assignedto);

  var selectElement = document.getElementById("users");
  var selectedOption = selectElement.options[selectElement.selectedIndex];
  var idExtracted = selectedOption.getAttribute("data-extra");
  console.log("Extra Value: ", idExtracted);

  let nameoftheadmin = localStorage.getItem("nameuser");
  const senddata = JSON.stringify({
    task_title: tasktitle,
    task_description: taskdescription,
    due_date: duedate,
    priority_level: prioritylevel,
    assigned_to: assignedto,
    created_by: nameoftheadmin,
    user_id: idExtracted,
  });
  console.log(senddata);

  const url = "http://localhost:3000/tasks";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: senddata,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log("Task Created Successfully");
    })
    .catch((error) => {
      console.log("error occured in second catch");
    });

  toastr["success"]("Task Has Been Created Successfully!", "Success");

  var popup = document.getElementById("popup");
  popup.style.display = "none";

  displayTasks();
}

//Display Tasks On Loading Page
function displayTasks() {

  // change button color

  let links=document.querySelectorAll('.navstyle')
  links.forEach((link)=>{
    link.classList.remove('clickedbutton')
  })

  let clickedlink=document.getElementById("currenttaskanchor")
  clickedlink.classList.add('clickedbutton')

  // --------------------------------------------------------
  document.getElementById("generateTablesearch").innerHTML = "<p></p>";
  let token = localStorage.getItem("credentials");
  // const url = "http://localhost:3000/tasks";
  const url = "http://localhost:3000/uncompleted/task";
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      if (response.redirected) {
        window.location.href = response.url;
      }
      return response.json();
    })
    .then((data) => {
      let length = data.length;
      console.log("length=", length);
      console.log(data);
      let content = `<table class="modern-table" id="tasktable">
          <thead>
          <tr>
          <th >Task Title <i onclick="sortTableTitle()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
          <th>Task Description <i onclick="sortTaskDescription()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
          <th>Due Date <i onclick="dueDateSort()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
          <th>Priority Level <i onclick="sortTablePriority()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
          <th>Status <i onclick="sortTableStatus()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
          <th>Assigned To <i onclick="sortTableAssigned()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
       
          <th>Actions</th>
          </tr>
          </thead>
          <tbody>`;
      for (i = length - 1; i >= 0; i--) {
        let ordate = moment(data[i].due_date);
        let formatdate = ordate.format("DD-MM-YYYY");
        content += `<tr>
            <td>${data[i].task_title}</td>
            <td>${data[i].task_description}</td>
            <td>${formatdate}</td>
            <td>${data[i].priority_level}</td>
            <td>${data[i].status}</td>
            <td>${data[i].assigned_to}</td>
            <td><button id="popupfunction-${data[i]._id}" onclick="invokePopupupdate('${data[i]._id}')" class='editbtnn' >Edit</button>
            <button onclick="cancelorder('${data[i]._id}')" id="cancelOrderButton-${data[i]._id}" class="deletebtnn">Delete</button>
            <button id="popupfunction-${data[i]._id}" onclick="openPopup('${data[i]._id}')" class='btncommentedit' title="Comment"><i class="fa-regular fa-message fa-fade" style="color: #ffffff;"></i></button></td>
            </td>
            
            </tr>`;
      }
      content += `</tbody></table>`;

      document.getElementById("generateTable").innerHTML = content;
    })
    .catch((error) => {
      console.log(error.message);
    });

  // User Selection For Select Button
  const userurl = "http://localhost:3000/users";
  fetch(userurl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let length = data.length;
      console.log(length);
      let content =
        "<select name='users' id='users'><option disabled selected value> Select User </option>";
      for (i = 0; i < length; i++) {
        content += `<option value="${data[i].name}" data-extra="${data[i]._id}">${data[i].name} [${data[i].username}]</option>`;
      }
      content += `</select>`;
      document.getElementById("userlist").innerHTML = content;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//---------------------------------------------------------------------
//Delete Task Popup Handling
function cancelorder(id) {
  const cancelOrderButton = document.getElementById(`cancelOrderButton-${id}`);
  const confirmationPopup = document.getElementById("confirmationPopup");
  const confirmCancel = document.getElementById("confirmCancel");
  const goBack = document.getElementById("goBack");
  confirmationPopup.style.display = "block";
  cancelOrderButton.addEventListener("click", () => {
    confirmationPopup.style.display = "block";
  });

  confirmCancel.addEventListener("click", () => {
    confirmationPopup.style.display = "none";
  });

  goBack.addEventListener("click", () => {
    confirmationPopup.style.display = "none";
  });

  //Displaying ID on textbox
  document.getElementById("passidfordelete").value = id;
}

//Deleting Task Function
function deleteTask() {
  console.log("Cancel on progress");
  let id = document.getElementById("passidfordelete").value;
  console.log("ID For Delete", id);

  const url = "http://localhost:3000/tasks/" + id;

  fetch(url, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response for Delete Request  was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Task Deleted successfully");
      getCakeList();
    })
    .catch((error) => {
      console.log("error occured in delete fetch");
    });

  toastr["info"]("Task Has Been Deleted Successfully", "Task Deleted");

  displayTasks();
}

// Update Popup Invoking
function invokePopupupdate(id) {
  var popup = document.getElementById("updatepopup");
  var closePopupButton = document.getElementById("closePopupupdate");
  popup.style.display = "block";

  closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

 

  console.log("TASK ID Recieved From Fnction", id);

  // Filling the Form With Data
  const url = "http://localhost:3000/tasks/" + id;

  fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("tasktitleupdate").value = data.task_title;
      document.getElementById("taskdescriptionupdate").value =
        data.task_description;
      let originalDateString = data.due_date;
      let formattedDate = moment(originalDateString).format("YYYY-MM-DD");
      console.log(formattedDate);
      document.getElementById("duedateupdate").value = formattedDate;
      document.getElementById("priorityupdate").value = data.priority_level;
      document.getElementById("assignedtoupdate").value = data.assigned_to;
      document.getElementById("hiddenidvalueupdate").value = data._id;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Update Task Function
function updateTaskDetails() {
  const tasktitle = document.getElementById("tasktitleupdate").value;
  const taskdescription = document.getElementById(
    "taskdescriptionupdate"
  ).value;
  const duedate = document.getElementById("duedateupdate").value;
  const id = document.getElementById("hiddenidvalueupdate").value;

  console.log("Due Date=", duedate);
  console.log("ID Value=", id);

  const isValid = isDateValid(duedate);

  if (isValid) {
    console.log("Entered date is valid.");
  } else {
    console.log("Due date should be greater than today's date.");
    let content = "<p>Due date should be greater than today's date!</p>";
    document.getElementById("errormessageupdate").innerHTML = content;
    return false;
  }

  function isDateValid(inputDate) {
    const enteredDate = new Date(inputDate);
    const currentDate = new Date();
    return enteredDate > currentDate;
  }


  const prioritylevel = document.getElementById("priorityupdate").value;

  if (
    tasktitle == "" ||
    taskdescription == "" ||
    duedate == "" ||
    prioritylevel == ""
  ) {
    console.log("Fill All the Fields");
    let content = "<p>Fill All The Fields !</p>";
    document.getElementById("errormessageupdate").innerHTML = content;
    return false;
  }

  console.log(tasktitle, taskdescription, duedate, prioritylevel, id);

  const senddata = JSON.stringify({
    task_title: tasktitle,
    task_description: taskdescription,
    due_date: duedate,
    priority_level: prioritylevel,
  });

  console.log(senddata);

  const url = "http://localhost:3000/tasks/" + id;
  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: senddata,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log("Task Updated Successfully");
    })
    .catch((error) => {
      console.log("error occured in second catch");
    });

  toastr["success"]("Task Has Been Updated Successfully!", "Success");

  var popup = document.getElementById("updatepopup");
  popup.style.display = "none";

  displayTasks();
}

function logout() {
  console.log("logout");

  localStorage.clear();
  const url = "http://localhost:3000/logout";

  fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      if (response.redirected) {
        window.location.href = response.url;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// view completed task list of all users
function viewCompletedTasksAllUsers() {

  let links=document.querySelectorAll('.navstyle')
  links.forEach((link)=>{
    link.classList.remove('clickedbutton')
  })

  let clickedlink=document.getElementById("cmpltetasknavigation")
  clickedlink.classList.add('clickedbutton')


  document.getElementById("generateTablesearch").innerHTML = "<p></p>";
  let token = "ppq";
  let url = "http://localhost:3000/completed/task";
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      if (response.redirected) {
        window.location.href = response.url;
      }
      return response.json();
    })

    .then((data) => {
      let length = data.length;
      console.log("length=", length);
      console.log(data);
      let content = `<table class="modern-table-complete">
            <thead>
            <tr>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Due Date</th>
            <th>Priority Level</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Assigned Date</th>
            <th>Completion Date<th>
            </tr>
            </thead>
            <tbody>`;
      for (i = length - 1; i >= 0; i--) {
        let ordate = moment(data[i].due_date);
        let formatdate = ordate.format("DD-MM-YYYY");

        let asgndate = moment(data[i].assigned_date);
        let formatassgndate = asgndate.format("DD-MM-YYYY");
        content += `<tr>
              <td>${data[i].task_title}</td>
              <td>${data[i].task_description}</td>
              <td>${formatdate}</td>
              <td>${data[i].priority_level}</td>
              <td>${data[i].status}</td>
              <td>${data[i].assigned_to}</td>
              <td>${formatassgndate}</td>
              <td>${data[i].completed_date}</td>
              
              
              </tr>
              <tr>`;
      }
      content += `</tbody></table>`;

      document.getElementById("generateTable").innerHTML = content;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//Function For Search Functionality

function searchTask() {

  let links=document.querySelectorAll('.navstyle')
  links.forEach((link)=>{
    link.classList.remove('clickedbutton')
  })

  let clickedlink=document.getElementById("searchtasknavigation")
  clickedlink.classList.add('clickedbutton')

  document.getElementById(
    "generateTable"
  ).innerHTML = `<div><input type="text" id="search" placeholder="Enter Task Name or Status">
  <button onclick="search()"  id="searchbutton" value="Search">Search</button></div>`;
}

function search() {
  let searchdata = document.getElementById("search").value;
  console.log("Value to Search", searchdata);

  if (searchdata == "") {
    console.log("Enter Search Word");
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-bottom-left",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr["error"](
      "Enter Task Name or Status For Searching Task",
      "No Search Words!"
    );
    return false;
  }
  let token = "abc";
  const url = "http://localhost:3000/task/search?findData=" + searchdata;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      if (response.redirected) {
        window.location.href = response.url;
      }
      return response.json();
    })
    .then((data) => {
      let length = data.length;
      console.log("length=", length);
      console.log(data);
      if (length > 0) {
        let content = `<table class="modern-table-search">
            <thead>
            <tr>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Due Date</th>
            <th>Priority Level</th>
            <th>Status</th>
            <th>Assigned To</th>
         
            <th>Actions/Completion Date</th>
            </tr>
            </thead>
            <tbody>`;
        for (i = length - 1; i >= 0; i--) {
          let ordate = moment(data[i].due_date);
          let formatdate = ordate.format("DD-MM-YYYY");
          content += `<tr>
              <td>${data[i].task_title}</td>
              <td>${data[i].task_description}</td>
              <td>${formatdate}</td>
              <td>${data[i].priority_level}</td>
              <td>${data[i].status}</td>
              <td>${data[i].assigned_to}</td>`;

           if(data[i].status!="Completed")
           {
          content += `<td><button id="popupfunction-${data[i]._id}" onclick="invokePopupupdate('${data[i]._id}')" class='btn edit-btn check' >Edit</button>
              <button onclick="cancelorder('${data[i]._id}')" id="cancelOrderButton-${data[i]._id}" class="btn delete-btn">Delete Task</button>
              </td>`;
           }
           else
           {
            content+=`<td>${data[i].completed_date}</td>`
           }

          content += `</tr>`;
        }
        content += `</tbody></table>`;

        document.getElementById("generateTablesearch").innerHTML = content;
      } else {
        document.getElementById(
          "generateTablesearch"
        ).innerHTML = `<img src="./assets/images/nodata.gif" id="nodata">`;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}


// ----------------------------------------------------------------------------------//
// JS FOR CHAT
// Popup display
function openPopup(id) {
  console.log("Id recieved for chat", id);
  console.log("opening popup");
  document.getElementById("blkpge").style.display = "block";
  document.getElementById("hideidvalue").value=id;
  // API Call to Get Data
  const url = "http://localhost:3000/tasks/" + id;

  fetch(url, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Messages", data.comments);
      let length=data.comments.length;
      console.log("Length of Message Array",length);
      document.getElementById("lengthidvalue").value=length
      let content="";

      if(length==0)
      {
        document.getElementById("chatBox").innerHTML = `<img id="nomess" src="./assets/images/nom.gif">`;
        chatBox.scroll=chatBox.scrollHeight;
      }
      else{
      for(i=0;i<length;i++)
      {
        content+=`<div>${data.comments[i]}</div>`;
        
      }
      document.getElementById("chatBox").innerHTML = content;
        chatBox.scroll=chatBox.scrollHeight;
    }


      var chatBox = document.getElementById("chatBox");
      
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function closePopup() {
  document.getElementById("blkpge").style.display = "none";
}

//   --------------------------------------------------------------//
function sendMessage() {
  let length=document.getElementById("lengthidvalue").value;


  let messagetosend=document.getElementById("messageInput").value;
  var messageInput = document.getElementById("messageInput");
  var chatBox = document.getElementById("chatBox");
  let id=document.getElementById("hideidvalue").value;
  console.log("ID recieved from chat",id);

  if(length==0)
  {
    document.getElementById("chatBox").innerHTML=`<div>Admin: ${messageInput.value}`;
    messageInput.value = "";
    document.getElementById("lengthidvalue").value="2";
  }

  else{
  if (messageInput.value.trim() !== "") {
    var message = document.createElement("div");
    message.textContent = "Admin: " + messageInput.value;
    chatBox.appendChild(message);
   }

    // Clear the input field
    messageInput.value = "";
  }

    // Send the Message To mongo for storing
    

    
    let senddata=JSON.stringify({message:"Admin: "+messagetosend});

    let url="http://localhost:3000/task/comment/"+id
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: senddata,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Message Inserted Successfully");
      })
      .catch((error) => {
        console.log("error occured in second catch");
      });


  }



function enterPress(event){

  if(event.key==="Enter")
  {
    sendMessage();
  }


}


// ---------------------------------------------------------------------------------
//Sort Table titile
var sortOrder = 1;
function sortTableTitle() {
  console.log("Performing Sorting");
  console.log(sortOrder);

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tasktable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      
     if(sortOrder==1)
     {
      if  (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        console.log("need to switch", shouldSwitch);
        break;
      }
    }
    else{
      if  (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        console.log("need to switch", shouldSwitch);
        break;
      }
      
    }

    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}
function sortTableTitleComplete() {
  console.log("Performing Sorting");
  console.log(sortOrder);

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("completedtable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      
     if(sortOrder==1)
     {
      if  (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        console.log("need to switch", shouldSwitch);
        break;
      }
    }
    else{
      if  (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        console.log("need to switch", shouldSwitch);
        break;
      }
      
    }

    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}

function sortTablePriority() {
  console.log("Performing Sorting");

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tasktable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if(sortOrder==1)
      {
       if  (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
     }
     else{
       if  (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
       
     }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}

function sortTablePriorityComplete() {
  console.log("Performing Sorting");

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("completedtable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if(sortOrder==1)
      {
       if  (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
     }
     else{
       if  (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
       
     }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}

function sortTableStatus() {
  console.log("Performing Sorting");

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tasktable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[4];
      y = rows[i + 1].getElementsByTagName("TD")[4];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if(sortOrder==1)
      {
       if  (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
     }
     else{
       if  (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
       
     }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}

function sortTableAssigned() {
  console.log("Performing Sorting");

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tasktable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[5];
      y = rows[i + 1].getElementsByTagName("TD")[5];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if(sortOrder==1)
      {
       if  (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
     }
     else{
       if  (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
       
     }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}

function sortTaskDescription() {
  console.log("Performing Sorting");

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tasktable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if(sortOrder==1)
      {
       if  (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
     }
     else{
       if  (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
       
     }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}

function sortTaskDescriptionCompleted() {
  console.log("Performing Sorting");

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("completedtable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if(sortOrder==1)
      {
       if  (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
     }
     else{
       if  (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
       
     }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}

function dueDateSort() {
  console.log("Performing Sorting");

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tasktable");

  if(!table)
  {
    table = document.getElementById("completedtable"); 
  }
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      
      var dateX = parseDate(x.innerHTML);
      var dateY = parseDate(y.innerHTML);
      console.log("date x ", dateX);
      console.log("date y", dateY);
      console.log(dateX, ">", dateY);


      if(sortOrder==1)
      {
       if  (dateX> dateY) {
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
     }
     else{
       if  (dateX<dateY){
         shouldSwitch = true;
         console.log("need to switch", shouldSwitch);
         break;
       }
       
     }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  sortOrder = -sortOrder;
}

function parseDate(dateString) {
  var parts = dateString.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}
