var express= require('express');
var bodyParser= require('body-parser');
var {ObjectID}= require('mongodb');
const {SHA256}= require('crypto-js');
const _= require('lodash');
const jwt= require('jsonwebtoken');

var {mongoose}= require('./db/mogoose');
var {User}= require('./models/user');
var {Todo}= require('./models/todo');

const port = process.env.PORT || 3000;
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

app.delete('/todos/:id', (req, res) => {
    let id= req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send({x:1});
    }
    Todo.findByIdAndRemove(id).then(
        (todo) => {
            if(!todo){
                return res.status(404).send({x:2});
            }
            res.send(todo);
        }
    ).catch(e => {
        res.status(400).send({x:3});
    })
});

app.patch('/todos/:id', (req, res) => {
    var id= req.params.id;
    var body= _.pick(req.body, ['text', 'completed']);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt= new Date().getTime();
        console.log(body.completedAt);
    }
    else{
        body.completed= false;
        body.completedAt= null;
    } 

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(
        (todo) => {
            if(!todo){
                return res.status(404).send();
            }
            res.send(todo);
        }
    )
    .catch(
        (e) => {
            res.status(400).send();
        }
    );
});

app.post('/user', (req, res) => {
    var body= _.pick(req.body, ['email', 'password']);
    var user= new User(body);
    
    user.save()
    .then(
        (user) => {
             return user.generateAuthToken();
        }
    )
    .then(
        (token) => {
            res.header('x-auth', token).send(user);
        } 
    )
    .catch((e) => {res.status(400).send(e);});
});

// var data= {id: 10};
// var x= jwt.sign(3436, 'patatas1');
// console.log(x);
// console.log(typeof x);


app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
  });

module.exports= {app};



