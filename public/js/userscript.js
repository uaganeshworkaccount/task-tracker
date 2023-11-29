//Create Task Popup Handling
function invokePopup() {
  var popup = document.getElementById("popup");
  var closePopupButton = document.getElementById("closePopup");
  // var popupForm = document.getElementById("popupForm");
  popup.style.display = "block";

  closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // popupForm.addEventListener("submit", (e) => {
  //   popup.style.display = "none";
  // });
}

//Create Task Function
function createTaskDetails() {
  const tasktitle = document.getElementById("tasktitle").value;
  const taskdescription = document.getElementById("taskdescription").value;
  const duedate = document.getElementById("duedate").value;
  console.log("Due Date=", duedate);

  //   const originalDateString = duedate; // Replace this with your input date
  //   const originalDateFormat = "MM/DD/YYYY";
  //   const convertedDateString = moment(originalDateString, originalDateFormat).format('YYYY-MM-DD');
  //  console.log(convertedDateString);

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

  const senddata = JSON.stringify({
    task_title: tasktitle,
    task_description: taskdescription,
    due_date: duedate,
    priority_level: prioritylevel,
    assigned_to: assignedto,
    created_by: "Rohit",
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
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);

      if (sortOrder == 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);

      if (sortOrder == 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
      x = rows[i].getElementsByTagName("TD")[4];
      y = rows[i + 1].getElementsByTagName("TD")[4];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if (sortOrder == 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
      x = rows[i].getElementsByTagName("TD")[4];
      y = rows[i + 1].getElementsByTagName("TD")[4];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if (sortOrder == 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
      x = rows[i].getElementsByTagName("TD")[5];
      y = rows[i + 1].getElementsByTagName("TD")[5];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if (sortOrder == 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if (sortOrder == 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      console.log("value of x", x);
      console.log("value of y", y);
      console.log(x, ">", y);
      if (sortOrder == 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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

  if (!table) {
    table = document.getElementById("completedtable");
  }
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    console.log("rows", rows);
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];

      var dateX = parseDate(x.innerHTML);
      var dateY = parseDate(y.innerHTML);
      console.log("date x ", dateX);
      console.log("date y", dateY);
      console.log(dateX, ">", dateY);

      if (sortOrder == 1) {
        if (dateX > dateY) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (dateX < dateY) {
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

function sortTaskID() {
  console.log("Performing Sorting");

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("tasktable");
  if (!table) {
    table = document.getElementById("completedtable");
  }
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
      if (sortOrder == 1) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          console.log("need to switch", shouldSwitch);
          break;
        }
      } else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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

//----------------------------------------------------------------------------------
//Display Tasks On Loading Page
function displayTasks() {
  // change button color

  let links = document.querySelectorAll(".navstyle");
  links.forEach((link) => {
    link.classList.remove("clickedbutton");
  });

  let clickedlink = document.getElementById("currenttaskanchor");
  clickedlink.classList.add("clickedbutton");
  let token = localStorage.getItem("credentials");
  let userid = localStorage.getItem("username");
  // let token = "ppp";
  const url = "http://localhost:3000/tasks/user/" + userid;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization: `${token}`,
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

      if (length == 0) {
        let content = `<img src="./assets/images/notask.png" id="notaskimage">`;
        document.getElementById("generateTable").innerHTML = content;
      } else {
        let content = `<table class="modern-table" id="tasktable"> 
            <thead>
            <tr>
            <th>Task ID <i onclick="sortTaskID()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th >Task Title <i onclick="sortTableTitle()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Description <i onclick="sortTaskDescription()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Due Date <i onclick="dueDateSort()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Priority <i onclick="sortTablePriority()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Status <i onclick="sortTableStatus()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
        
            <th>Created By</th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>`;
        for (i = length - 1; i >= 0; i--) {
          let ordate = moment(data[i].due_date);
          let formatdate = ordate.format("DD-MM-YYYY");
          content += `<tr>
              <td>${data[i].task_created_id}</td>
              <td>${data[i].task_title}</td>
              <td>${data[i].task_description}</td>
              <td>${formatdate}</td>
              `;

          if (data[i].priority_level == "Low") {
            content += `<td id="greenalert">${data[i].priority_level}</td>`;
          } else if (data[i].priority_level == "Medium") {
            content += `<td id="yellowalert">${data[i].priority_level}</td>`;
          } else if (data[i].priority_level == "High") {
            content += `<td id="redalert">${data[i].priority_level}</td>`;
          }

          content += `<td>${data[i].status}</td>
           
                     <td>${data[i].created_by}</td>
              <td><button id="popupfunction-${data[i]._id}" onclick="invokePopupupdate('${data[i]._id}')" class='stbtnchange' >Change Status</button>
              <button id="popupfunction-${data[i]._id}" onclick="openPopup('${data[i]._id}')" class='btncommentedit' ><i class="fa-regular fa-message fa-fade" style="color: #ffffff;"></i></button></td>
             
              
              </tr>
              `;
        }
        content += `</tbody></table>`;

        document.getElementById("generateTable").innerHTML = content;
      }
    })
    .catch((error) => {
      let content = `<img src="./assets/images/notask.png" id="notaskimage">`;
      document.getElementById("generateTable").innerHTML = content;
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
        content += `<option value="${data[i].name}" data-extra="${data[i]._id}">${data[i].name}</option>`;
      }
      content += `</select>`;
      document.getElementById("userlist").innerHTML = content;
    })
    .catch((error) => {
      console.log(error.message);
    });

  //For Showing Notification
  setInterval(() => {
    console.log("Checking New Notifications");

    //Ajax Call
    let notificationurl = "http://localhost:3000/tasks/notification/" + userid;
    fetch(notificationurl, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let notificationlength = data.length;
        // console.log("Notification Length",notificationlength);
        if (notificationlength > 0) {
          const audio = new Audio("./assets/notification.mp3");
          audio.play();
          console.log("Notification Present");
          toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: false,
            progressBar: true,
            positionClass: "toast-bottom-left",
            preventDuplicates: false,
            onclick: function () {
              // let notedata=" ";
              let k = 0;
              let notificationcontent = ` <div class="notificationpopup-content" id="notificationpopupmessage">
              <h4 id="regconfirm">Notification <img id="bellicon" src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f514/512.gif" alt="🔔" width="32" height="32"></h4>
              <p id="">The Following Tasks Has Been Assigned To You!</p>`;

              for (k; k < notificationlength; k++) {
                notificationcontent += `<p>Task ${k + 1} : ${
                  data[k].task_title
                }</p>`;
                //  notedata+="Task "+(k+1)+": "+data[k].task_title+"\n";
              }
              // alert(notedata);
              notificationcontent += ` <button id="goNotify" class="bts">OK</button></div>`;
              document.getElementById("notificationPopup").innerHTML =
                notificationcontent;
              notifyUser();
            },
            showDuration: "3000",
            hideDuration: "1000",
            timeOut: "30000",
            extendedTimeOut: "0",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            opacity: "1",
            backgroundcolor: "#1a631d",
          };

          toastr["success"](
            "You Have Been Assigned " +
              notificationlength +
              " New Task. Click Here to Know Details ! ",
            "📌 New Task Assigned"
          );

          for (j = 0; j < notificationlength; j++) {
            let notifyupdateurl = "http://localhost:3000/tasks/" + data[j]._id;

            let datatosend = JSON.stringify({ notification: "0" });
            // console.log(datatosend);

            fetch(notifyupdateurl, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: datatosend,
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network Response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
                console.log("Notification Status Set to 0");
              })
              .catch((error) => {
                console.log("error occured in second catch");
              });
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, 1000);

  //User Identity

  let nameofuser = localStorage.getItem("nameuser");
  let userinfo = `<p>Hi ${nameofuser}! </p>`;
  document.getElementById("useridentity").innerHTML = userinfo;
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
  // var popupForm = document.getElementById("popupForm");
  popup.style.display = "block";

  closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // popupForm.addEventListener("submit", (e) => {
  //   popup.style.display = "none";
  // });

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
      console.log("Status", data.status);
      document.getElementById("currentstatus").value = data.status;
      document.getElementById("hiddenidvalueupdate").value = data._id;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Update Status
function updateStatus() {
  const status = document.getElementById("currentstatus").value;
  const id = document.getElementById("hiddenidvalueupdate").value;

  console.log("Receieved Task Id", id);
  if (status == "") {
    console.log("Fill The Status");
    let content = "<p>Fill Status !</p>";
    document.getElementById("errormessageupdate").innerHTML = content;
    return false;
  }

  const today = moment();
  const formattedToday = today.format("DD-MM-YYYY");

  console.log(status);

  if (status == "Completed") {
    var sendstatus = JSON.stringify({
      status: status,
      completed_date: formattedToday,
    });
  } else {
    var sendstatus = JSON.stringify({
      status: status,
    });
  }

  console.log(sendstatus);

  const url = "http://localhost:3000/tasks/" + id;
  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: sendstatus,
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

  toastr.options = {
    closeButton: false,
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
  toastr["success"]("Status Has Been Updated Successfully!", "Success");

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

// View Completed Tasks Of Users
function viewCompletedTasksUser() {
  //change button to active
  let links = document.querySelectorAll(".navstyle");
  links.forEach((link) => {
    link.classList.remove("clickedbutton");
  });

  let clickedbtn = document.getElementById("completedtaskanchor");
  clickedbtn.classList.add("clickedbutton");

  let token = "ppq";
  let userid = localStorage.getItem("username");
  let url = "http://localhost:3000/tasks/user/completed/" + userid;
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
      let content = `<table class="modern-table-completed " id="completedtable">
            <thead>
            <tr>
            <th >Task Id <i onclick="sortTaskID()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Task Title <i onclick="sortTableTitleComplete()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Task Description <i onclick="sortTaskDescriptionCompleted()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Due Date <i onclick="dueDateSort()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Priority <i onclick="sortTablePriorityComplete()" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></th>
            <th>Status</th>
            <th>Assigned</th>
            <th>Completed Date</th>
            </tr>
            </thead>
            <tbody>`;
      for (i = length - 1; i >= 0; i--) {
        let asgndate = moment(data[i].assigned_date);
        let formatassgndate = asgndate.format("DD-MM-YYYY");
        let ordate = moment(data[i].due_date);
        let formatdate = ordate.format("DD-MM-YYYY");
        content += `<tr>
              <td>${data[i].task_created_id}</td>
              <td>${data[i].task_title}</td>
              <td>${data[i].task_description}</td>
              <td>${formatdate}</td>
              <td>${data[i].priority_level}</td>
              <td>${data[i].status}</td>
              <td>${formatassgndate}</td>
              <td>${data[i].completed_date}</td>
              </tr>
              `;
      }
      content += `</tbody></table>`;

      document.getElementById("generateTable").innerHTML = content;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function notifyUser() {
  const confirmationPopup = document.getElementById("notificationPopup");

  confirmationPopup.style.display = "block";

  const goBack = document.getElementById("goNotify");

  goBack.addEventListener("click", () => {
    confirmationPopup.style.display = "none";
  });
}
// ----------------------------------------------------------------------------------//
// JS FOR CHAT
// Popup display
function openPopup(id) {
  console.log("Id recieved for chat", id);
  console.log("opening popup");
  document.getElementById("blkpge").style.display = "block";
  document.getElementById("hideidvalue").value = id;
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
      let length = data.comments.length;
      console.log("Length of Message Array", length);
      document.getElementById("lengthidvalue").value = length;
      let content = "";

      if (length == 0) {
        document.getElementById(
          "chatBox"
        ).innerHTML = `<img id="nomess" src="./assets/images/nom.gif">`;
        console.log("executed");
      } else {
        for (i = 0; i < length; i++) {
          let message = data.comments[i].split(":");
          // content += `<div>${data.comments[i]}</div>`;
          if (message[0] === "Admin") {
            content += `<div class="chatmessagestye" title="hello"><span id="boldmessageadmin">${message[0]} :</span>${message[1]}</div>`;
          } else {
            content += `<div class="chatmessagestye" title="hello"><span id="boldmessage">${message[0]} :</span>${message[1]}</div>`;
          }
        }
        var chatBox = document.getElementById("chatBox");
        document.getElementById("chatBox").innerHTML = content;
        //  var message = document.createElement("div");
        //  message.textContent = data.comments[0];
        //  chatBox.appendChild(message);
      }
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
  let length = document.getElementById("lengthidvalue").value;

  let user = localStorage.getItem("nameuser");
  let messagetosend = document.getElementById("messageInput").value;
  var messageInput = document.getElementById("messageInput");
  var chatBox = document.getElementById("chatBox");
  let id = document.getElementById("hideidvalue").value;
  console.log("ID recieved from chat", id);

  if (length == 0) {
    document.getElementById(
      "chatBox"
    ).innerHTML = `<div>${user}: ${messageInput.value}`;
    messageInput.value = "";
    document.getElementById("lengthidvalue").value = "2";
  } else {
    if (messageInput.value.trim() !== "") {
      var message = document.createElement("div");
      var userspan = document.createElement("span");

      userspan.textContent=user;
      userspan.id = "boldmessage";
      let messageText=document.createTextNode(": "+messageInput.value)
      message.appendChild(userspan);
      message.appendChild(messageText);
      message.classList.add("chatmessagestye");
      // message.textContent = user + " : " + messageInput.value;
      chatBox.appendChild(message);
    }

    // Clear the input field
    messageInput.value = "";
  }

  // Send the Message To mongo for storing

  let senddata = JSON.stringify({ message: user + ": " + messagetosend });

  let url = "http://localhost:3000/task/comment/" + id;
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

function enterPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
