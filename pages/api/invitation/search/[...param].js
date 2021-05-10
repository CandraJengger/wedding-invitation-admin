import prisma from '../../../../lib/prisma';
import authenticate from '../../middleware';

const handler = async (req, res) => {
  const param = req.query.param;

  if (req.method === 'GET') {
    if (param.length != 1) {
      if (param[0] == 'show') {
        try {
          const result = await prisma.invitation.findMany({
            where: {
              show: param[1] == 'true' ? true : false,
            },
            orderBy: {
              id_invitation: 'desc',
            },
          });

          if (!result) {
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
              result,
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
        try {
          const result = await prisma.invitation.findMany({
            where: {
              attending: param[1] == 'true' ? true : false,
            },
            orderBy: {
              id_invitation: 'desc',
            },
          });

          if (!result) {
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
              result,
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
      }
    } else {
      try {
        const result = await prisma.invitation.findMany({
          where: {
            OR: [
              {
                name: {
                  contains:
                    param[0].charAt(0).toUpperCase() + param[0].slice(1),
                },
              },
              {
                name: {
                  contains: param[0],
                },
              },
            ],
          },
        });

        if (!result) {
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
            result,
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

export default authenticate(handler);
