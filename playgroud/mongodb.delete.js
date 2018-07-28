const {MongoClient, ObjectID}= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('anbale to connect to mongoDB');
    }

    // db.collection('Todos').deleteMany({text: "eat lunch"}).then(
    //     (result) => {
    //         console.log(result);
    //     }
    // );

    db.collection('Todos').findOneAndDelete({_id: new ObjectID('5b5c76a57620e71ea12779d1')}).then((result) => {
        console.log(result);
    });
});