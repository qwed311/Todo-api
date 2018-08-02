const {User}= require('../models/user');

var authenticate= (req, res, next) => {
     var tokin= req.header('x-auth');

    User.findByToken(tokin)
    .then(
        (user) => {
            if(!user){
                return Promise.reject();
            }
            req.user= user;
            req.token= tokin;
            next();
        }
    )
    .catch(
        (e) => {
            res.status(401).send(e);
        }
    )
};


module.exports= {authenticate};