const bcrypt = require("bcrypt");

function generateHashPassword(password) {
  const salt = bcrypt.genSaltSync(+process.env.SALT);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function verifPassword(inputPw, pwDB) {
  return bcrypt.compareSync(inputPw, pwDB);
}

// const data = generateHashPassword("1234")
// console.log(verifPassword("1234", data))
//$2b$10$Z5xpvZPbEzG74y..TfGLXOG1b2ny..nlVPKvNVUIt156R4vOHiYbW

module.exports = { generateHashPassword, verifPassword };
