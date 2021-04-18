import prisma from '../../lib/prisma';
import {
    compare,
    hash
} from 'bcrypt';

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


        compare(password, login.password, function (err, result) {
            // result == true
            res.json({error : err, hasil : result})
            // if (!err && result) {
            //     //login
            //     res.status(200);
            //     res.json({
            //         success: true,
            //         message: `Success`
            //     });
            // } else {
            //     res.status(404);
            //     res.json({
            //         success: false,
            //         error: {
            //             message: `Cannot login`
            //         }
            //     });
            // }
            // res.end();
        });
        // try {
            

        // } catch (e) {
        //     res.json({
        //         message: e
        //     })
        // }
    }
}