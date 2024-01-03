const mongoDb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const MongoClient = mongoDb.MongoClient;
let _db;
const mongoConnect = () => {
MongoClient.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.w3eayvu.mongodb.net/?retryWrites=true&w=majority`)
.then(client=>{
    console.log("connected");
    _db = client.db();
   
})
.catch(error=>{
    console.log(error);
});

}
 
const getDb = () =>{
    if(_db)
    {
        return _db;
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

