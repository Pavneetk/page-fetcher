const request = require('request');
const fs = require('fs');
const webpage = process.argv[2];
const savefile = process.argv[3];
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});




request(webpage, (error, response, body) => {
  if(response.statusCode !== 200) process.exit("error:", error); 
  
 
  if(fs.existsSync(savefile)){
    rl.question("File Aleady Exists. Continue (y/n)?", (answer) => {
      if (answer === 'y' ) {
        fs.writeFile(`./${savefile}`,body, ()=>{
        console.log(`Downloaded and saved ${fs.statSync(savefile).size} bytes to ${savefile}`)
        }); 
      } else {
       process.exit();
      }
    rl.close();
    });
  } else{
    fs.writeFile(`./${savefile}`,body, ()=>{
      console.log(`Downloaded and saved ${fs.statSync(savefile).size} bytes to ${savefile}`)
      }); 
      process.exit();
  }
 
  
});
  

