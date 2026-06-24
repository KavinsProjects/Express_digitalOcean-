import express from "express";
import dotenv, { configDotenv } from "dotenv"
import logger from './logger.js';
import morgan from 'morgan';
const app = express();
configDotenv()
const PORT = process.env.PORT || 4000;

app.use(express.json()); // acceppting datafrom from frontend in jsonformat
const morganFormat = ':method :url :status :response-time ms';  
//                    {method =GET/PUT, url= "api/car/3", status=200,201, response-time : complieng time}

let catData = [];
let nextId = 1;
//middel ware
app.use(morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status: message.split(' ')[2],
        responseTime: message.split(' ')[3],
        
      };
      logger.info(JSON.stringify(logObject));
    }
  }
}));

// const toslple = "kavin k playing Foodball";
// const words = toslple.split(' ')[0];
// console.log(words)

//add new cars
app.post("/car", (req, res) => {
  //console.log("POST");
  const { name, model, price } = req.body; // we add the data from postman think it is frontend
  const newCar = { id: nextId++, name, model, price };
  catData.push(newCar);
  res.status(201).send(newCar);
});

//get all cars
app.get("/car", (req, res) => {
  //console.log("GET");
  res.status(200).send(catData);
});

//get with id
app.get("/car/:id", (req, res) => {
//console.log("GET")
  const cars = catData.find((c) => c.id === parseInt(req.params.id));
  if (!cars) {
    return res.status(404).send("Car Not found");
  } else {
    res.send(200).send("i found it", cars);
  }
});

//update

app.put("/car/:id", (req, res) => {
 // console.log("PUT")
  const cars = catData.find((c)=> c.id === parseInt(req.params.id));
  if (!cars) {
    return res.status(404).send("Car Not found");
  }
  const { name, model, price }= req.body
  cars.name = name
  cars.model = model
  cars.price = price
  res.send(200).send(cars)
});

//delete
app.delete("/car/:id", (req,res)=>{
  //console.log("DELETE")
    const index = catData.findIndex(t=> t.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send("car not found")
    }else{
        catData.splice(index, 1);
        return res.status(204).send("deleted")

    }
})


// app.get("/", (req,res)=>{
//     res.sendStatus=200
//     res.send("Hello Hi Everyone I'm kavin");
// });

// app.get("/aboutMe", (req,res)=>{
//     res.sendStatus=200
//     res.send("Hello I Love Travelling the word");
// });

// app.get("/xAccount", (req,res)=>{
//     res.sendStatus=200
//     res.send("kavinGreeks.com");
// });

app.listen(PORT, () => {
  try {
    console.log("The server is runing on the PORT of localhost:", PORT);
  } catch (error) {
    console.error("Their errorr in connection to port", error);
  }
});
