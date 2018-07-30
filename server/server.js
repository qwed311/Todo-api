var express= require('express');
var bodyParser= require('body-parser');
var {ObjectID}= require('mongodb');

var {mongoose}= require('./db/mogoose');
var {User}= require('./models/user');
var {Todo}= require('./models/todo');

var app= express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   var newTodo= new Todo({
       text: req.body.text
   });
   newTodo.save().then(
       (data) => {res.send(data);},
       (err) => {res.status(400).send(err);} 
   );
});

app.get('/todos', (req, res) => {
    Todo.find().then(
        (todos) => {
            res.send({todos})
        },
        (err) => {res.status(400).send(err);}
    );
});

app.get('/todos/:id', (req, res) => {
    let id= req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send({e: "a"});
    }
    Todo.findById(id).then(
        (todo) => {
            if(!todo){
                return res.status(404).send({e: "b"});
            }
            res.send(todo);
            console.log(todo._id);
        },
        (err) => {res.status(400).send({e: "c"})}
    );
});
  



app.listen(3000, () =>{
    console.log('Todos has started');
});

module.exports= {app};



