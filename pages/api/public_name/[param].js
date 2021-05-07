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

  const nameInvit = req.query.param.replace('-', ' ');

  if (req.method === 'GET') {
    try {
      const data = await prisma.invitation.findUnique({
        where: {
          name: nameInvit,
        },
      });

      if (!data) {
        return res.status(404).json({
          success: false,
          error: {
            message: `Not Found!`,
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          data,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: {
          message: `Internal server error!`,
        },
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      error: {
        message: `Method ${res.method} not allow!`,
      },
    });
  }
};
