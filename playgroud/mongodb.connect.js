const MongoClient= require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error){
        return console.log('unable to connet to mongoDB server');
    }
    console.log('connected to mongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (error, result) => {
    //     if(error){
    //         return console.log('anable to insert to Todos');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    
    // db.collection('Users').insertOne({
    //     name: 'Anderw',
    //     age: 100,
    //     location: 'USA'
    // }, (error, result) => {
    //     if(error){
    //         console.log('unable to insert to users collection');
    //     }
    //     console.log(result.ops, undefined, 3);
    // });

    db.close();
});
