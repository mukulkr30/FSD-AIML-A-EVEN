import http from 'http'
import os from 'os'

const port = 5001;
const users = [{
            id:1,
            name:"mukul",
            email:"mukul.in"
        },
        {
            id:2,
            name:"harshit",
            email:"harshit.in"   
        },
        {
            id:3,
            name:"divyanshu",
            email:"divyanshu.in"
        }
        ]
const server = http.createServer((req,res) =>{
    const url = req.url
    if(url == "/users" && req.method == "GET"){
        res.statusCode = 200
        res.end(JSON.stringify(users))
    }
    else if(url.startsWith("/users/") && req.method == "GET"){
        const id = url.split("/")[2];
        const user = users.find(u=> u.id == id)
        if(!user){
            res.statusCode = 400
            console.log(`id ${id} not found`)
            return res.end(`id ${id} not found`)
        }
        else{
            res.statusCode = 200
            console.log(`id ${id} found`)
            return res.end(JSON.stringify(user))
        }
    }
    else if(url.startsWith("/createuser") && req.method == "POST"){
        let body = ""
        req.on("data", (chunk)=>{
            body+=chunk
        })
        req.on("end",()=>{
            const dt = JSON.parse(body)
            const newuser ={
                id : Date.now(),
                name: dt.name,
                email: dt.email
            }
            users.push(newuser)
            res.statusCode = 200
            res.end("create user")
        })
        
    }
    else if(url.startsWith("/users/") && req.method == "PUT"){
        const id = url.split("/")[2];
        const userIndex = users.findIndex(u=> u.id == id)
        if(userIndex ==-1){
            res.statusCode = 400
            return res.end(`user ${id} not found`)
        }
        let body = ""
        req.on("data",(chunk)=>{
            body+=chunk
        } )
        req.on("end",()=>{
            const data = JSON.parse(body)
            users[userIndex] = {...users[userIndex], ...data};
            console.log(`id ${id} update success`)
            res.end(`id ${id} update success`)
            
        })
    }
    else if(url.startsWith("/user/") && req.method == "DELETE"){
        const id = url.split("/")[2];
        const userIndex = users.findIndex(u=> u.id == id)
        if(userIndex ==-1){
            res.statusCode = 400
            return res.end(`user ${id} not found`)
        }
        users.splice(userIndex,1)
        res.statusCode = 200
        res.end(`user ${id} deleted`);
    }
    else{
        res.statusCode = 404;
        res.end("server error")
    }
})


server.listen(port, ()=>{
    console.log(`running on Port ${port}`)
})