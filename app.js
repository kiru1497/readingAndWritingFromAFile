const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Show form
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h2>Simple Form</h2>
      <form action="/submit" method="POST">
        <input type="text" name="username" placeholder="Enter name" required />
        <br><br>
        <button type="submit">Submit</button>
      </form>
    `);
  }

  // Handle form submission
  else if (req.url === "/submit" && req.method === "POST") {
    let body = "";

    // Collect form data
    req.on("data", chunk => {
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {
      // body looks like: username=Kiran
      const username = body.split("=")[1];

      // Write to file
      fs.appendFileSync("data.txt", `Username: ${username}\n`);

      // Redirect using 302
      res.writeHead(302, { Location: "/success" });
      res.end();
    });
  }

  // Redirect destination
  else if (req.url === "/success") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h3>Form submitted successfully</h3>");
  }

  // Fallback
  else {
    res.writeHead(404);
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running");
});
