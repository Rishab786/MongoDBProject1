const { getDb } = require('../utils/database');
class User {
    constructor(name,email,password){
        this.name=name;
        this.email=email;
        this.password=password;
      
    }
    save(){
        let db=getDb();
        return db.collection('Users').insertOne(this);
    }

    static fetchByEmail(email){
        let db=getDb();
        return db.collection('Users').findOne({email});
    }
   

}
module.exports=User;