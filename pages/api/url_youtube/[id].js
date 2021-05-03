import prisma from '../../../lib/prisma';
import authenticate from '../middleware';

const handler = async(req, res) => {
    const linkId = req.query.id;
    const { url } = req.body;

    if (req.method === "GET") {
        try {
            const link = await prisma.link_youtube.findUnique({
                where : {
                    id_link : Number(linkId)
                }
            });

            if (!link){
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
                    link
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
    } else if (req.method === "PUT") {
        try {
            const update = await prisma.link_youtube.update({
                where: {
                    id_link : Number(linkId)
                },
                data : {
                    url : url
                }
            });

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
                    message : `Internal server error`
                }
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const delete_link = await prisma.link_youtube.delete({
                where : {
                    id_link : Number(linkId)
                }
            });

            return res.status(200).json({
                success : true,
                data : {
                    message : `Success delete data`
                }
            });
        } catch (error) {
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
                    message : error
                }
            });
        }
    } else {
        return res.status(405).json({
            success : false,
            error : {
                message : `Method ${req.method} not allow`
            }
        });
    }
}


export default authenticate(handler);