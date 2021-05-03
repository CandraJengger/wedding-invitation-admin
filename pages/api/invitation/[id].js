import prisma from '../../../lib/prisma';
import authenticate from '../middleware';

const handler = async (req, res) => {
  const invitationId = req.query.id

  if (req.method === 'GET') {
    try {
      const invitation = await prisma.invitation.findUnique({
        where: {
          id_invitation: Number(invitationId)
        }
      })
  
      if (!invitation) {
        return res.json({
          success: false,
          error: {
            code: 404,
            message: "Not Found!"
          }
        });
        
      } 
      return res.status(200).
        json({
          success: true,
          data: {
            invitation
          }
        });
  
    } catch (e) {
      console.log(e);
      return res.status(500)
      .json({
        success: false,
        error: {
          message: `Internal server error!`
        }
      }).
      end();
    }
  } else if (req.method === 'DELETE') {
    try {
      const invitation = await prisma.invitation.delete({
        where: {
          id_invitation: Number(invitationId)
        },
      });

      return res.status(200).
      json({
        success : true, 
        data : {
          message : `Success delete data`
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

      return res.status(500).
      json({
        success : false,
        error : {
          message : `Internal server error!`
        }
      }).
      end();
    }
    
  } else if (req.method === 'PUT') {
    const {name, show} = req.body;

    try {
      const updateInvit = await prisma.invitation.update({
        where : {
          id_invitation : Number(invitationId)
        },
        data : {
          name : name,
          show : show
        }
      });

      if (updateInvit.length == 0) {
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
          message : `Success update data`
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success : false,
        error : {
          message : `Internal server error!`
        }
      })
    }
  } else {
    return res.status(405).
    json({
      success : false,
      error : {
        message : `The HTTP ${req.method} method is not supported at this route.`
      }
    });
  }
}

export default authenticate(handler);