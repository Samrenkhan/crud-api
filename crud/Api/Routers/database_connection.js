const { MongoClient } =require('mongodb');
const url = 'mongodb://localhost:27017';
const database = 'data';
const client = new MongoClient(url); // client means data lekr ana server se
async function getData() {
    let result = await client.connect();//client promise return karta hai
   let db= result.db(database)//data name
   let collection = db.collection('student_emp');// collection means table name
   let response= await collection.find({}).toAarry();
    console.log(response);
}
getData()