module.exports = function (err, req, res, next) {
    if (err.name =='SequelizeValidationError' || err.name =='Validation Error') {
        res.status(400).json({
            message: "Validation error"
        })
    } else if (err.name == 'Not found') {
        res.status(404).json({
            message: "Not found"
        })
    } else if (err.name == 'Auth failed') {
        res.status(401).json({
            msg: 'Wrong email or password'
        })
    } 
    else {
        res.status(500).json(err);
    }
}