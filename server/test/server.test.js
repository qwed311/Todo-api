const expect= require('expect');
const superTest= require('supertest');
const {ObjectID}= require('mongodb');

const {app}= require('../server');
const {Todo}= require('../models/todo');

var id1= new ObjectID();
var id2= new ObjectID();
const todos= [{text: "first test todo", _id: id1}, {text: "second test todo", _id: id2}];

beforeEach((done) => {
    Todo.remove({})
    .then(
       () => {
            Todo.insertMany(todos);  //USE RETURN TO LET YOU CHAIN callbacks
            return;
       }
    )
    .then(
        () => done()
    );
});

describe('POST/todos', () => {
    it('should create new todo', (done) =>{
        var text= "Test to do test";

        superTest(app)
        .post('/todos')
        .send({text: text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.find({text: res.body.text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            })
            .catch((e) => done(e));
        });
    });
    
    it('should send an invalid body and still pass because im testing then with error data', (done) => {
        superTest(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end(
            (err, res) => {
                expect(res.status).toBe(400);
                Todo.find().then(
                    (todos) => {
                        expect(todos.length).toBe(2);
                        expect(todos[0].text).toBe("first test todo");
                        done();
                    }
                ).catch((e) =>done(e)); 
            }
        );
    });
    

});

describe('GET/todos', () => {
    it('should get all todos',(done) =>{
        superTest(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});


describe('GET/todos:id', () => {
    it('should get a todo by ID', (done) => {
        superTest(app)
        .get(`/todos/${id1.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(id1.toHexString());
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexStr= new ObjectID().toHexString;
        superTest(app)
       .get(`/todos/${hexStr}`)
       .expect(404)
       .end(done);
    });
});