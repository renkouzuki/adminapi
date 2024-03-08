import getPrismaInstant from "../lib/prisma.js"

const prisma = getPrismaInstant()

export const CheckUserIsValid = async(req,res,next) =>{
    try{
        const { id } = req.query
        if(!id){
            return res.status(401).json({error:"forbidden!"})
        }
        const user = await prisma.users.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!user){
            return res.status(404).json({error:"user doesnt exist!"})
        }
        await next()
    }catch(error){
        return res.status(500).json({msg:error})
    }
}