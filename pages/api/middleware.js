import {verfiy} from './auth';

const authenticate = (handler) => {
    return async(req, res) => {
        let cookie = req.headers.cookie;
        let authToken = req.headers.authorization;
        if(!cookie || !authToken){
            return res.status(403).json({
                success: false,
                message: `Please login to get access!`
            })
        }

        try {
            const decode = verfiy(authToken);
            if(!decode){
                res.status(403).
                json({
                    success : false,
                    error : {
                        message : `Invalid token!`
                    }
                }).
                end();
            }
            req.username = decode;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({
                success : false,
                error : {
                    message : 'Sorry, you are not authenticated!'
                }
            });
        }
    }
}

export default authenticate
