function registerUser() {
  let name = document.getElementById("nameofuser").value;
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmpassword = document.getElementById("confirmpassword").value;

  let ki = "";

  let pattern= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi;

  if(!pattern.test(email))
  {
    return false;
  }

  if (password != confirmpassword) {
    ki = `<p id="pmessage">Passwords do not match !</p>`;
    document.getElementById("passwordmessage").innerHTML = ki;
    return false;
  }

  if (name == "" || email == "" || username == "" || password == "") {
    let content = "<p id='custommessageredirect' >Fill All The Fields!</p>";
    document.getElementById("message").innerHTML = content;
    return false;
  }


  // console.log(name, email, username, password);

  const link = "http://localhost:3000/register";

  let senddata = JSON.stringify({
    name: name,
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password: password,
  });

  fetch(link, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: senddata,
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
       console.log("Data Recieved",data);
      if (data.token) {
        // let content = "<p id='custommessage' >Registration Successful</p>";
        // document.getElementById("message").innerHTML = content;

        // setTimeout(() => {
        //   let content =
        //     "<p id='custommessageredirect' >Redirecting to Login !</p>";
        //   document.getElementById("message").innerHTML = content;
        // }, 1000);
        

        document.getElementById("successpopupmessage").innerHTML=`<h4 id="regconfirm">Hey <span id="namedisplay"> ${data.name}, </span> </br> Your Account has been Successfully Registered ✔️</h4><br>
        <p id="messageconfirm">Let's Login with your credentials 🔒</p>`;

        const confirmationPopup = document.getElementById("confirmationPopup");
        confirmationPopup.style.display = "block";

        setTimeout(() => {
          location.href = "./login.html";
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function checkuser() {

  console.log("Check User Running");
  let username = document.getElementById("username").value;
  console.log(username);
  if (!username) {
    document.getElementById("usermessage").innerHTML = "<p></p>";
    console.log("Enter username");
    return false;
  }

  //checking
  let senddata = JSON.stringify({ username: username.toLowerCase() });
  fetch("http://localhost:3000/userexist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: senddata,
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
      let exist = "";
      let available = "";

      if (data.message == "exist") {
        console.log("exist");
        exist += `<p id="existmessage">Username already exist ❌</p>`;
        document.getElementById("usermessage").innerHTML = exist;
      } else {
        console.log("available");
        available += `<p id="availablemessage">Username available ✔</p>`;
        document.getElementById("usermessage").innerHTML = available;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//check email

function checkemail() {
  console.log("Check email Running");
  let email = document.getElementById("email").value;
  console.log(email);
  if (!email) {
    console.log("Enter email");
    document.getElementById(
      "emailmessage"
    ).innerHTML = `<p id="existemail"></p>`;
    return false;
  }

  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi;

  if (!pattern.test(email)) {
    document.getElementById(
      "emailmessage"
    ).innerHTML = `<p id="existemail">Incorrect Email Format❌</p>`;
    return false;
  }

  //checking
  let emaildata = JSON.stringify({ email: email.toLowerCase() });
  fetch("http://localhost:3000/emailexist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: emaildata,
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
      let exist = "";
      let available = "";

      if (data.message == "exist") {
        console.log("exist");
        exist += `<p id="existemail">Email already exist ❌</p>`;
        document.getElementById("emailmessage").innerHTML = exist;
      } else {
        console.log("available");
        available += `<p id="availableemail">Email available ✔</p>`;
        document.getElementById("emailmessage").innerHTML = available;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function passwordmatch() {
  console.log("exec");
  let password = document.getElementById("password").value;
  let confirmpassword = document.getElementById("confirmpassword").value;

  if (!confirmpassword) {
    document.getElementById("passwordmessage").innerHTML = "";
    return false;
  }
  let ki = "";
  let gg = "";
  if (password != confirmpassword) {
    ki += `<p id="pmessage">Passwords do not match !</p>`;
    document.getElementById("passwordmessage").innerHTML = ki;
  } else {
    document.getElementById("passwordmessage").innerHTML = gg;
  }
}

// Register Popup
// function cancelorder(id) {
//   const confirmationPopup = document.getElementById("confirmationPopup");

//   confirmationPopup.style.display = "block";

//   cancelOrderButton.addEventListener("click", () => {
//     confirmationPopup.style.display = "block";
//   });

//   confirmCancel.addEventListener("click", () => {
//     confirmationPopup.style.display = "none";
//   });

//   goBack.addEventListener("click", () => {
//     confirmationPopup.style.display = "none";
//   });
// }
