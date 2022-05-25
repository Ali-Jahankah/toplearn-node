const { EventEmitter } = require("events");
const http = require("http");
const fs = require("fs");

const em = new EventEmitter();

em.addListener("firstEvent", (data) => console.log(data));

em.on("secondEvent", (data) => console.log(data));
em.emit("secondEvent", "second Ali");
em.emit("firstEvent", "ali");

const server = http.createServer((req, res) => {
  const { url, method, headers } = req;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title>Toplearn NODE.js</title></head><body><h1>Home Page</h1><br><form action='/message' method='POST'><input name='message'><input type='submit'></form></body></html>"
    );
    res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("messages.txt", message);
      res.writeHead(302, { location: "/" });
    });

    res.write(
      "<html><head><title>Toplearn NODE.js</title></head><body><h1>Message...</h1></body></html>"
    );
    res.end();
  } else {
    res.write(
      "<html><head><title>Toplearn NODE.js</title></head><body><h1>Not Found!!!!!!</h1></body></html>"
    );
    res.end();
  }
});
server.listen(4000);
