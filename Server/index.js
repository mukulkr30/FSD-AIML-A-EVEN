import http from "http";
import os from "os";

const port = 5001;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/" && req.method === "GET") {
    res.write("<h1>Hello Mukul</h1>");
    res.end();
  } 
  else if (url === "/system" && req.method === "GET") {
    const data = {
      platform: os.platform(),
      cpuCores: os.cpus().length,
      arch: os.arch(),
      freeMemory: os.freemem(),
      totalMemory: os.totalmem()
    };
    res.write(JSON.stringify(data));
    res.end();
  } 
  else {
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
