import prisma from '../../../lib/prisma';
import authenticate from '../middleware';
import multer from 'multer';
import path from 'path';
import xlsx from 'node-xlsx';

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.xls' && ext !== '.xlsx' && ext !== '.xlsb' && ext !== '.xlsm') {
            return cb(new Error('Only accept data in excel format!'), false)
        }
        cb(null, true)
    }
});

const handler = async (req, res) => {
    if (req.method === 'GET') {
        // res.json({data : req.username});
        try {
            const invitations = await prisma.invitation.findMany({
                orderBy: {
                    id_invitation: 'desc'
                }
            });
            if (!invitations) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Not Found!"
                    }
                });

            }

            return res.status(200)
                .json({
                    success: true,
                    data: {
                        invitations
                    }
                });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                error: {
                    message: `Internal server error!`
                }
            });
        }
    } else if (req.method === "POST") {
        try {
            upload.single("file")(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    console.log(err);
                    return res.status(400).json({
                        success: false,
                        error: {
                            message: err.message
                        }
                    });
                } else if (err) {
                    console.log(err)
                    return res.status(400).json({
                        success: false,
                        error: {
                            message: err.message
                        }
                    });
                }

                console.log(req.file);

                let data = [];
                const dataSheet = xlsx.parse(process.cwd() + `/uploads/${req.file.filename}`);
                // console.log(dataSheet[0].data)
                for (const [i, v] of dataSheet[0].data.entries()) {
                    if (i == 0) {
                        continue;
                    }
                    const objek = {
                        name: v[1]
                    }
                    data.push(objek);
                }
                // console.log(data);
                const result = await prisma.invitation.createMany({
                    data: data
                });

                if (result.length == 0) {
                    return res.status(404).json({
                        success: false,
                        error: {
                            message: `Not Found!`
                        }
                    });
                }

                return res.status(201).
                json({
                    success: true,
                    message: "Success insert data"
                });

            });
        } catch (e) {
            console.log(e);
            if (e.code == 'ENOENT') {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: e.message
                    }
                })
            }
            return res.status(500).
            json({
                success: false,
                error: {
                    message: "Internal server error!"
                }
            });
        }

    } else {
        return res.status(405).
        end(`Method ${req.method} not allow`);
    }

}

export default authenticate(handler);

export const config = {
    api: {
        bodyParser: false,
    },
}