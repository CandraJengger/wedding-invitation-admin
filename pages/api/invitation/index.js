import {
    triggerFocus
} from 'antd/lib/input/Input';
import prisma from '../../../lib/prisma'

export default async function (req, res) {

    if (req.method === 'GET') {
        try {
            const invitations = await prisma.invitation.findMany();
            if (invitations.length > 0) {
                res.status(200);
                res.json({
                    success: true,
                    data: {
                        invitations
                    }
                });
            } else {
                res.status(404);
                res.json({
                    success: false,
                    error: {
                        message: "Not Found!"
                    }
                });
            }

            res.end();
        } catch (e) {
            res.status(500);
            res.json({
                success: false,
                error: {
                    message: e
                }
            });
            res.end();
        }
    } else if (req.method === "POST") {
        try {
            const {
                name,
                attending,
                wish
            } = req.body;
            const result = await prisma.invitation.create({
                data: {
                    name: name,
                    attending: attending,
                    wish: wish
                }
            });

            res.status(201);
            res.json({
                success:true,
                message:"Success!"
            });
            res.end();
        } catch (e) {
            res.status(500);
            res.json({
                success: false,
                error: {
                    message: "Failed insert data!"
                }
            });
            res.end();
        }
    } else {
        res.status(405);
        res.end(`Method ${req.method} not allow`);
    }

}