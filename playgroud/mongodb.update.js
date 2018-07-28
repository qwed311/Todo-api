const {MongoClient, ObjectID}= require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('anable to connect to mongoDB server');
    }

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b5c88887620e71ea1277c6c')
    // }, {
    //     $set: {
    //         completed: true,
    //         eat: 'potato'  
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate(
        {name: 'Peds'},
        {
            $inc:{age: 5},
            $set:{name: 'jane'}     
        },
        {returnOriginal: false})
        .then((result) => {
            console.log(result);
        });

});