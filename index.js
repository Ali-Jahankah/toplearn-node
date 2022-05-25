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
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>Toplearn NODE.js</title></head><body><h1>Starting...</h1></body></html>"
  );
  res.end();
});
server.listen(4000);
