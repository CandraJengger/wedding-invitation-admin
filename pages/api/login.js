import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import {sign} from './auth';
import cookie from 'cookie';

export default async function (req, res) {

    if (req.method === 'POST') {
        const {
            username,
            password
        } = req.body;

        const login = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if(!login){
            res.status(404).json({
                success : false,
                error : {
                    message : `Not Found!`
                }
            });
        }

            bcrypt.compare(password, login.password, function (err, result) {
                
                if (!err && result) {
                    const token = sign(login);
                    res.setHeader('Set-Cookie', cookie.serialize('tokenAccess', token, {
                        httpOnly: true,
                        secure : process.env.NODE_ENV !== "development",
                        maxAge : 60 * 60,
                        sameSite: "strict",
                        path: "/"
                      }));
                    res.status(200);
                    res.json({success : true, data : {
                        message : `Success login`
                    }})
                } else {
                    res.status(404);
                    res.json({
                        success: false,
                        error: {
                            message: `Password invalid!`
                        }
                    })
                }
            });

    } else {
        res.status(405);
        res.end(`Method ${req.method} not allow`);
    }
}