import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const invitationId = req.query.id

  if (req.method === 'GET') {
    handleGET(invitationId, res)
  } else if (req.method === 'DELETE') {
    handleDELETE(invitationId, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// GET /api/post/:id
async function handleGET(invitationId, res) {
  try {
    const invitation = await prisma.invitation.findUnique({
      where: {
        id_invitation: Number(invitationId)
      }
    })

    if (invitation.length != 0) {
      res.status(200);
      res.json({
        success: true,
        data: {
          invitation
        }
      })
    } else {
      res.json({
        success: false,
        error: {
          code: 404,
          message: "Not Found"
        }
      });
    }
    res.end();

  } catch (e) {
    res.json({
      success: false,
      error: {
        message:e
      }
    });
    res.end();
  }

}

// DELETE /api/post/:id
async function handleDELETE(invitationId, res) {
  const invitation = await prisma.invitation.delete({
    where: {
      id_invitation: Number(invitationId)
    },
  })
  res.json(invitation)
}