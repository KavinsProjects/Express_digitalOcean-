import express from "express";
import dotenv, { configDotenv } from "dotenv"
const app = express();
configDotenv()
const PORT = process.env.PORT || 4000;

app.use(express.json()); // acceppting datafrom from frontend in jsonformat

let catData = [];
let nextId = 1;

//add new cars
app.post("/car", (req, res) => {
  const { name, model, price } = req.body; // we add the data from postman think it is frontend
  const newCar = { id: nextId++, name, model, price };
  catData.push(newCar);
  res.status(201).send(newCar);
});

//get all cars
app.get("/car", (req, res) => {
  res.status(200).send(catData);
});

//get with id
app.get("/car/:id", (req, res) => {
  const cars = catData.find((c) => c.id === parseInt(req.params.id));
  if (!cars) {
    return res.status(404).send("Car Not found");
  } else {
    res.send(200).send("i found it", cars);
  }
});

//update

app.put("/car/:id", (req, res) => {
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
