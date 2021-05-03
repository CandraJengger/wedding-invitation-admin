
export default async (req, res) => {
    return res.status(405).json({
        success : false,
        error : {
            message : `Method ${req.method} not allow`
        }
    })
}