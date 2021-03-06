import prisma from '../../../lib/prisma';
import authenticate from '../middleware';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';

async function hashPassword(password) {
  const hashing = await bcrypt.hash(password, 10);
  return hashing;
}

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          id_user: 'desc',
        },
      });

      if (!users) {
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
          users,
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
  } else if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const passHash = await hashPassword(password).catch((err) => {
        return res.json({
          success: false,
          error: {
            message: err,
          },
        });
      });

      const result = await prisma.user.create({
        data: {
          username: username,
          password: passHash,
        },
      });

      if (!result) {
        return res.status(400).json({
          success: false,
          error: {
            message: `Bad request!`,
          },
        });
      }

      return res.status(201).json({
        success: true,
        data: {
          message: `Success insert data`,
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
        message: `Method ${req.method} not allow`,
      },
    });
  }
};
export default authenticate(handler);
