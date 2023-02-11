const jwt = require('../libs/jsonwebtoken');
const config = require('../configs/config');
exports.authentication = async (req, res, next)=>{
    const token = req.cookies['auth'];

    if (token) {
        try{
            const decodedToken = await jwt.verify(token, config.SECRET);

            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;
        }catch(err){
            res.clearCookie('auth');
            return res.status(401).render('/404');
        }
    }

    next();
};

exports.isAuthenticated = (req, res, next)=>{
    if (req.user) {
        return res.redirect('/login');
    }

    next();
};