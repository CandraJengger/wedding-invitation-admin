import jwt from 'jsonwebtoken';

const KEY = '62d9dc0d-494d-474c-9061-7fae75b40d4c'

export function sign(user) {
    if(user.password){
        delete user.password
    }

    return jwt.sign({username : user.username}, KEY, {expiresIn: '1h'});
}

export function verfiy(token) {
    try {
        return jwt.verify(token, KEY);
    } catch (error) {
        console.log(error);
        return false;
    }
}