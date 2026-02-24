import http from "http"
import os from "os"

const port = 5001
var item;
const server = http.createServer((req, res)=>{
    const url = req.url;
    if(url =="/" && req.method=="GET"){
        res.statusCode = 201
        res.end("<h1>Hii from mukul. We are at home page</h1>")
    }
    else if (url == "/contact" && req.method == "GET"){
        const data = {
            "name":"mukul",
            "email": "mukul.com",
            "phone": "+91 000000000",
        }
        res.statusCode = 201
        res.end(JSON.stringify(data))

    }
    else if (url == "/system" && req.method == "GET") {
        const data = {
          platform: os.platform(),
          arch: os.arch(),
          freeMemory: (os.freemem()/1024**3).toFixed(2),
          totalMemory: os.totalmem()
        };
        res.statusCode = 201
        res.end(JSON.stringify(data));
    }
    else if (url == "/senddata" && req.method == "POST"){
        let body = "";
        req.on("data",(chunk)=>{
            body = body+chunk
        })
        req.on("end",()=>{
            console.log(Object)
            res.end(body);
        })
        
    }
    else if (url == "/viewdata" && req.method == "GET"){
        const data  = {"item":"value"}
        res.statusCode = 201
        res.end(JSON.stringify(data))

    }
    else{
        res.statusCode = 404
        res.end("<h1>page not found</h1>")
    }
})

server.listen(port, ()=>{
    console.log(`running on Port ${port}`)
})