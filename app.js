const http = require("http");
const fs = require("fs"); 

const server = http.createServer((req, res) => {
  
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(`
      <form action="/message" method="POST">
        <input type="text" name="username" placeholder="Enter name" required />
        <br><br>
        <button type="submit">Add</button>
      </form>
    `);
  }
  else{
    if(req.url === '/message'){
      res.setHeader("Content-Type", "text/html")
      let body = []; 
      req.on('data', (chunks)=> {
        body.push(chunks);
      })

      req.on('end',()=>{
        let buffer=Buffer.concat(body);
      
        let formData = buffer.toString(); 
        console.log(formData); 

        const formValues = formData.split("=")[1]; 

        fs.writeFile('formValue.txt',formValues, (err)=>{

          res.statusCode = 302; 
          res.setHeader("location","/");
          res.end();
        })
      })
    }
  }
});

server.listen(3000, () => {
  console.log("Server is running");
});
