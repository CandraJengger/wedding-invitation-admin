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
      const wishes = await prisma.invitation.findMany({
        where: {
          show: true,
        },
        orderBy: {
          id_invitation: 'desc',
        },
      });

      if (!wishes) {
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
          wishes,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: {
          message: `Internal server error`,
        },
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      error: {
        message: `Method ${req.method} not allow!`,
      },
    });
  }
};
