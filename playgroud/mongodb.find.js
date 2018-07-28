const {MongoClient, ObjectID}= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('unable to connect to mongoDB server');
    }
    db.collection('Todos').find().count().then((count) => {
        console.log(`to dos: ${count}`);
    },
    (err) => {
         console.log('unable to fetch Todos');
     });
});