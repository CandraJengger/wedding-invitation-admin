import prisma from '../../../lib/prisma';
import slugify from 'slugify';

export default async (req, res) => {
  const nameInvit = req.query.param;
  // console.log(nameInvit);
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
