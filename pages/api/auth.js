import jwt from 'jsonwebtoken';

const KEY = '62d9dc0d-494d-474c-9061-7fae75b40d4c'

export function sign(user) {
    if(!user){
        return false;
    }

    return jwt.sign({username : user.username}, KEY, {expiresIn: 60*60});
}

export function verfiy(token) {
    try {
        return jwt.verify(token, KEY, function(err, decode){
            if(err){
                console.log(err);
                return false;
            }
            return decode;
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}