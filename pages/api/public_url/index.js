import Cors from 'cors';
import prisma from '../../../lib/prisma';
import corsMiddleware from '../cors';

const cors = corsMiddleware(
  Cors({
    methods: ['GET'],
  })
);

export default async (req, res) => {
  await cors(req, res);
  if (req.method === 'GET') {
    try {
      const url = await prisma.link_youtube.findFirst();

      if(!url){
        return res.status(404).json({
          success: false,
          error: {
            message: 'Not Found!'
          }
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          url,
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: {
          message: `Internal server error!`,
        }
      })
    }
  } else {
    return res.status(405).json({
        success : false,
        error : {
            message : `Method ${req.method} not allow`
        }
    })
  }
}