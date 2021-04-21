import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import {sign} from './auth';

var salt = bcrypt.genSaltSync(10);

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

        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                throw (err);
            }

            bcrypt.compare(password, hash, function (err, result) {
                if (!err && result) {
                    const token = sign(login)
                    res.status(200);
                    res.json({success : true, authToken : token})
                } else {
                    res.status(404);
                    res.json({
                        success: false,
                        error: {
                            message: err
                        }
                    })
                }
            });
        });

    } else {
        res.status(405);
        res.end(`Method ${req.method} not allow`);
    }
}