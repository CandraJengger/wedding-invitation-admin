import prisma from '../../../lib/prisma';
import authenticate from '../middleware';
import slugify from 'slugify';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const invitations = await prisma.invitation.findMany({
        orderBy: {
          id_invitation: 'desc',
        },
      });

      invitations.forEach((v, i) => {
        v.link = 'https://kiki-dimas-wedding.vercel.app/#' + slugify(v.name);
        v.number = i + 1;
      });

      if (!invitations) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Not Found!',
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          invitations,
        },
      });
    } catch (e) {
      console.log(e);
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
        message: `Method ${req.method} not allow`,
      },
    });
  }
};

export default authenticate(handler);
