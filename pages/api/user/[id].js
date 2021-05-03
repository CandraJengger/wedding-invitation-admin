import prisma from '../../../lib/prisma';
import authenticate from '../middleware';
import bcrypt from 'bcrypt';

async function hashPassword(password) {
    const hashing = await bcrypt.hash(password, 10);
    return hashing;
}

const handler =  async (req, res) => {
    const userId = req.query.id;
    if(req.method === 'GET'){
        try {
            const user = await prisma.user.findUnique({
                where : {
                    id_user : Number(userId)
                }
            });

            if (!user) {
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
                    user
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
        const {username, password} = req.body;
        const passHash = await hashPassword(password).catch(err => {
            return res.json({
                success : false,
                error : {
                    message : err
                }
            })
        });
        try {
            const updateUser = await prisma.user.update({
                data : {
                    username : username,
                    password : passHash
                }, 
                where : {
                    id_user : Number(userId)
                }
            })

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
            });
        }
    } else if (req.method === 'DELETE') {
        try {
            const delUser = await prisma.user.delete({
                where : {
                    id_user : Number(userId)
                }
            });

            return res.status(200).json({
                success : true,
                error : {
                    message : `Success delete data`
                }
            });
        } catch (error) {
            console.log(error);
            if(error.code == 'P2025'){
                return res.status(404).json({
                    success : false,
                    error : {
                        message : error.meta.cause
                    }
                })
            }
            return res.status(500).json({
                success : false,
                error : {
                    message : `Internal server error!`
                }
            });
        }
    } else {
        return res.status(405).json({
            success : false,
            error : {
                message : `Method ${req.method} not allow`
            }
        }).end();
    }
}

export default authenticate(handler);