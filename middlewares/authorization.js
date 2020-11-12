async function authorization(req, res, next) {
    console.log(req.userLogin);
    try {
        if (req.userLogin.role === 'admin') {
            next()
        } else {
            next({
                name: 'unauthorized'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = authorization;