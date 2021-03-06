var mongoose= require('mongoose');
var validator= require('validator');
const jwt= require('jsonwebtoken');
var mongodb= require('mongodb');
var _= require('lodash');
var bcrypt= require('bcryptjs');

var UserSchema= new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: true,
      unique: true,
      validate: {
        validator: (value) => {return validator.isEmail(value)},
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    tokens: [{
      access:{
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  },
  {usePushEach: true}
);

UserSchema.methods.toJSON= function(){
  var userObject= this.toObject();
  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken= function(){
  var user= this;
  var access= 'auth';
  var token= jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({token, access});

  return user.save().then(
    () => {return token},
  );
};

UserSchema.methods.removetoken= function(tokin) {
  return this.update({
    $pull: {tokens: {token: tokin}}
  });
};

UserSchema.statics.findByToken= function(token){
  var decoded;

  try{
    decoded= jwt.verify(token, 'abc123');
  }
  catch(e){
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function (next){
  if(this.isModified('password')){     //a buit in nmethod to test if oject property is modified;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) =>{
        this.password= hash;
        next();
      });
    });
  }
  else{next();}
});

UserSchema.statics.findCredentials= function(email, pass) {
  return this.findOne({email}) .then((user) => {
    if(!user){return Promise.reject();}
    
    return new Promise((resolve, reject) => {
      bcrypt.compare(pass, user.password, (err, res) => {
        if(!res){
          reject('email and password dont match');
        }
          resolve (user);
      });
    });
  });  
};



var User= mongoose.model('user', UserSchema);

module.exports= {User};