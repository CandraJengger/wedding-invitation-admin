import prisma from '../../../lib/prisma';
import authenticate from '../middleware';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        // res.json({data : req.username});
        try {
            const invitations = await prisma.invitation.findMany();
            if (invitations.length > 0) {
               return res.status(200)
               .json({
                    success: true,
                    data: {
                        invitations
                    }
                }).end();
            } else {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Not Found!"
                    }
                }).end();
            }

            // res.end();
        } catch (e) {
            return res.status(500).json({
                success: false,
                error: {
                    message: e
                }
            }).end();
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

export default authenticate(handler);