let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);


function hashPassword(data) {
    let hash = bcrypt.hashSync(data, salt);
    return hash
}

function comparePassword(data, hash) {
    let compare = bcrypt.compareSync(data, hash);
    return compare
}


// console.log(hashPassword("123456"));
// console.log(comparePassword("123456","$2a$10$EJAKQRIqMVqAaJg.cXvmEOKhx4LzZmPwNuETzTaral/.awOSdcf1S"));

module.exports = {
    hashPassword, comparePassword
}