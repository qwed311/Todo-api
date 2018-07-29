var express= require('express');
var bodyParser= require('body-parser');

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
       (err) => {res.send(err);}
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


app.listen(3000, () =>{
    console.log('Todos has started');
});

module.exports= {app};



