import prisma from '../../../lib/prisma'

export default async function(req, res){
    if(req.metod === 'GET'){

    } else {
        res.status(405);
        res.end(`Method ${req.method} not allow`)
    }
}