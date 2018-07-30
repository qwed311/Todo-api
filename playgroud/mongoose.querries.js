const {Todo}= require('../server/models/todo');
const mongoose= require('mongoose');
const {ObjectID}= require('mongodb');


_id= '5b5e9c19b740f3e017091f26';

mongoose.connect('mongodb://localhost:27017/TodoApp');

// Todo.find({_id}).then((todos) => {
//     console.log(todos);
// });



// for(let b=0; b<10; b++){
//     let x= new ObjectID();
//     console.log(x);   

// }


let c=1000;

for(let b=0; b<10; b++){
    setTimeout(() => {
        var y= new ObjectID();
        console.log(`B:${y}`); 
        console.log(y.getTimestamp());
    }, c);

    gen(c, () => {
        var x= new ObjectID();
        console.log(`C:${x}`);
        console.log(x.getTimestamp());
        console.log('\n');
    });
    c+=1000;
}


function gen(delay, callback){
    setTimeout(() => {
        callback();
    }, delay+1000);
 };


