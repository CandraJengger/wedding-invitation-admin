// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie';

export default (req, res) => {
    const token = req.headers.cookie;

    if (!token) {
        res.status(401).json({
            success : false,
            error : {
                message : `Please login to get access!`
            }
        })
    }

    res.setHeader('Set-Cookie', cookie.serialize('tokenAccess', '', {
        secure : process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/"
    }));
  
    res.status(200);
    res.json({
        success : true, 
        data : {
            message : `Success logout`
        }
    })
}
