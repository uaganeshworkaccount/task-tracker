

// FUnction to login 
function LoginUser(){

let username=document.getElementById('username').value;
let password=document.getElementById('password').value;

console.log(username,password);

//Checking with db
const bodyData = JSON.stringify({
   username:username,
   password:password,
   email:username
  });
console.log(bodyData);
  const url = "http://localhost:3000/login";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyData,
  })
    .then((response) => {
      if (!response.ok) {
        let content='<p id="message">Invalid Credentials</p>'
        document.getElementById("message").innerHTML=content;
        throw new Error("Network Response was not ok");
        
      }
      if(response.redirected){
          window.location.href=response.url;
      }
      return response.json();
    })
    .then((data) => {
      console.log("data recieved from server",data.user);
      // let content=`<p id="msg">${data.message}</p>`;
      // document.getElementById('message').innerHTML=content;
      
      localStorage.setItem("credentials",data.token);
      localStorage.setItem("username",data.username);
      localStorage.setItem("nameuser",data.user.name);
      localStorage.setItem("role",data.role)
      // console.log("role",data.role)
      // console.log("name",data.user.name)
      if(data.role=="user"){

         location.href="./user.html"
      }

      if(data.role=="admin"){

        location.href="../admin.html"
      }
      
    })
    .catch((error) => {
      console.log(error);
    });

  event.preventDefault();

}


// function checkJWTPresent()
// {
 
//   let jwt=localStorage.getItem("credentials")

//   if(jwt)
//   {
//     console.log("JWT Detected");
//       let role=localStorage.getItem("role");

//       if(role)
//       {
//         if(role==="user")
//         {
//           location.href="./user.html";
//         }
//         else if(role==="admin")
//         {
//           location.href="./admin.html"; 
//         }

//       }
//   }
// }

document.addEventListener('DOMContentLoaded',function(){

  let jwt=localStorage.getItem("credentials")

  if(jwt)
  {
    console.log("JWT Detected");
      let role=localStorage.getItem("role");

      if(role)
      {
        if(role==="user")
        {
          location.href="./user.html";
        }
        else if(role==="admin")
        {
          location.href="./admin.html"; 
        }

      }
  }



})