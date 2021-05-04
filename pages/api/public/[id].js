import prisma from '../../../lib/prisma';

export default async (req, res) => {
    const invitId = req.query.id;
    
    if (req.method === 'GET') {
        try {
            const wish = await prisma.invitation.findMany({
                where : {
                    AND : [
                        {
                            id_invitation : {
                                equals : Number(invitId)
                            }
                        },
                        {
                            attending : {
                                equals : true
                            }
                        }
                    ]
                }
            });
    
            if (wish.length == 0) {
                return res.status(404).json({
                    success : false,
                    error : {
                        message : `Not Found!`
                    }
                });
            }
    
            return res.status(200).json({
                success : true,
                data : {
                    wish
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success : false,
                error : {
                    message : `Internal server error!`
                }
            });
        }
    } else if (req.method === 'PUT') {
        const {wish, attending} = req.body;
    
        try {
            const updateInvit = await prisma.invitation.update({
                where : {
                    id_invitation : Number(invitId)
                }, 
                data : {
                    wish : wish,
                    attending : attending     
                }
            });
    
            if (!updateInvit) {
                return res.status(404).json({
                    success : false,
                    error : {
                        message : `Not Found!`
                    }
                });
            }
    
            return res.status(200).json({
                success : true,
                data : {
                    message : `Success update data`
                }
            });
        } catch (error) {
            console.log(error);
            if (error.code == 'P2025') {
                return res.status(404).json({
                    success : false,
                    error : {
                        message : error.meta.cause
                    }
                });
            }
            return res.status(500).json({
                success : false,
                error : {
                    message : `Internal server error!`
                }
            })
        }
    }
    
}