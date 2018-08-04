const bcrypt= require('bcryptjs');

var a= 'pota1';
bcrypt.genSalt(10, (err, salt) => {
    salt+='jen';
    bcrypt.hash(a, salt, (err, hash) => {
        console.log(hash);
        console.log(salt);
    });
});



hashedPass= '$2a$10$eV0kigKXuORB/zjtryvS0ekeko82eaFRSTzoILvuU8CPbjNLoZnGW';
bcrypt.compare(a, hashedPass, (err, res) => {
    console.log(res);
});



