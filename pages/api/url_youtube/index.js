import prisma from '../../../lib/prisma';
import authenticate from '../middleware';

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const link_yt =  await prisma.link_youtube.findMany({
                orderBy : {
                    id_link : "desc"
                }
            });
            if(!link_yt){
                return res.status(404).json({
                    success : false,
                    error : {
                        message : `Not Found!`
                    }
                });
            }
            
            return res.status(200).
            json({
                success : true,
                data : {
                    link_yt
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
    } else if(req.method === "POST") {
        const {url} = req.body;
        try {
            const result = await prisma.link_youtube.create({
                data: {
                    url : url
                }
            });

            if(!result){
                return res.status(404).json({
                    success : false,
                    error : {
                        message : `Not Found!`
                    }
                });
            }

            return res.status(201).json({
                success : true,
                data : {
                    message : `Success insert data`
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success : false,
                error : {
                    message : error
                }
            });
        }
    } else {
        return req.status(405).json({
            success : false,
            error : {
                message : `Method ${req.method} not allow`
            }
        }).
        end();
    }
}

export default authenticate(handler);