import express from 'express'
import next from 'next';
import cookieParser from 'cookie-parser';
import {
    SERVER_ALLOWED_ORIGIN,
    SERVER_PORT,
    HOST_NAME,
  } from './config/environment';

console.log(SERVER_PORT)
console.log(HOST_NAME)
const nextApp = next({
    dev: 'test',
    hostname: HOST_NAME,
    port: SERVER_PORT,
  });

const handler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {

const server = express()

server.use(express.json())
server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({extended: true}));

server.post('/api/getDevice',(req,res)=>{

    console.log(req.body)
    res.status(200).send({msg:'ja ist okay'})

})
server.get('/api/getDevice',(req,res)=>{

    console.log(req.body)
    res.status(200).send({msg:'ja ist okay'})

})
const httpServer = http.createServer(server);

  httpServer.listen(SERVER_PORT, () => {
    console.log(`http://localhost:${SERVER_PORT}`);
  });

})