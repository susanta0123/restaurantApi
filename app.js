const express = require('express');
const mongo = require ("mongodb");
const MongoClient = mongo.MongoClient;
const bodyParser = require("body-parser");
const app = express()
const PORT = 5002

// middleware

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const MONGO_URL = 'mongodb://127.0.0.1:27017';


// Rest Api endpoints

app.get("/", function (req, res){
  res.send("Hello World");
});

// get locations
app.get("/locations", function (req, res){
    db.collection("location").
    find()
    .toArray((err,result)=>{
        if (err) throw err;
        res.send(result);
    });
});

    // get mealType
app.get("/quickSearch", function (req, res){
    db.collection("mealType")
    .find()
    .toArray((err,result)=>{
        if (err) throw err;
        res.send(result);
    })
 
});
 // get restaurant data
 app.get("/restaurant", function (req, res){
    let query ={};
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);

    
    if (stateId){
        query = {state_id: stateId};
    } else if(mealId){
        query ={"mealTypes.mealtype_id": mealId};
    }
    db.collection("restaurantdata")
    .find( query)
    .toArray((err,result)=>{
        if (err) throw err;
        res.send(result);
        
    })
 
});

// filter
app.get("/filter/:mealId", function (req, res){
    let query = {};
    let sort = {cost: 1};
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    if(req.query.sort){
        sort = {cost: req.query.sort};
    }

    if(cuisineId){
        query = {
            "mealTypes.mealtype_id": mealId,
            "cuisines.cuisine_id": cuisineId,
        };
    } else if(lcost && hcost){
        query = {
            "mealTypes.mealtype_id": mealId,
            $and: [{cost: {$gt: lcost,  $lt: hcost}}],

        };
    }
    else if(cuisineId && lcost && hcost){
        query = {
            "mealTypes.mealtype_id": mealId,
            "cuisines.cuisine_id": cuisineId,
            $and: [{cost: {$gt: lcost,  $lt: hcost}}],

        };
    }
    db.collection("restaurantdata")
    .find(query)
    .sort(sort)
    .toArray((err,result)=>{
        if (err) throw err;
        res.send(result);
    });
 
});



// restaurant details 

app.get("/details/:id", function (req, res){
    // let id = mongo.ObjectId(req.params.id);
    let id = Number(req.params.id);
    db.collection("restaurantdata")
    .find({restaurant_id: id })
    .toArray((err,result)=>{
        if (err) throw err;
        res.send(result);
    })
 
});

// meals details for restaurant 

app.get("/menu/:id", function (req, res){
    let id = Number(req.params.id);
    db.collection("menu")
    .find({restaurant_id: id})
    .toArray((err,result)=>{
        if (err) throw err;
        res.send(result);
    })
 
});

// Place order

app.post("/placeorder", function (req, res){
    console.log(req.body)
    db.collection("orders").insert(req.body, (err, result)=>{
        if(err)throw err;
        res.send("Order Placed")
    });
});
    


// menu details
app.post("/menuItem", function (req, res){
    if(Array.isArray(req.body.id)) {
        db.collection("menu")
        .find({menu_id: {$in: req.body.id}})
        .toArray((err,result)=>{
            if (err) throw err;
            res.send(result);
        });       
    } else{
        res.send("Invalid input");
    }
});

// list of orders
app.get("/orders", function (req, res){
    let query = {}
    let email = req.query.email;
    if(email){
        query = {email};
    }
    db.collection("orders")
    .find(query)
    .toArray((err,result)=>{
        if (err) throw err;
        res.send(result);
    })
});

// update order
app.put("/updateOrder/:id", function (req, res){
    let oid = Number(req.params.id);
     db.collection("orders").updateOne(
        {orderId: oid}, 
        {
            $set:{
            status:req.body.status,
            bank_name: req.body.bank_name,
            date: req.body.date,
        },
    }, (err,result)=>{
         if (err) throw err;
         res.send("Order is updated");
     });
 });

// delete orders
app.delete("/deleteOrder/:id", function (req, res){
   let _id = mongo.ObjectId(req.params.id);
    db.collection("orders").deleteOne({_id},(err,result)=>{
        if (err) throw err;
        res.send("Order Deleted");
    });
});


// Mongo connection
MongoClient.connect(MONGO_URL, (err, client)=>{
    console.log("Mongo is connected")
    if (err)console.log("Error connecting")
   db = client.db("zomatodata")
    app.listen(PORT, ()=>{ 
        console.log(`server listen on port ${PORT}`);
    });
});
