import prisma from '../../../lib/prisma';

export default async (req, res) => {
  if (req.method === 'GET') {
    const name = req.query.name;

    try {
      const wishes = await prisma.invitation.findUnique({
        where: {
          name: name,
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
