
const fs=require("fs");
let data = fs.readFileSync("./value.txt",{ encoding: 'utf8', flag: 'r' });
let increment=parseInt(data)+1;
console.log("incremented to",increment);
fs.writeFile("./value.txt", increment.toString(), (err) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("File written successfully\n"); 
    } 
  }); 