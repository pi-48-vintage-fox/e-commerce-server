async function authorization(req, res, next) {
    try {
        if (req.userHasLogin.role === 'admin') {
            next()
        } else if (!find) {
            next({
                name: 'not found'
            });
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