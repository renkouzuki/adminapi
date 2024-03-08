import getPrismaInstant from "../lib/prisma.js"

const prisma = getPrismaInstant()

export const getPurchase = async (req,res) =>{
 try{
    const {filter = '' , taken = "5" , page = '1'} = req.query
    
    let takenValue = +taken;
    let skip = (+page - 1) * takenValue
    
    const purchase = await prisma.purchase.findMany({
        take:takenValue,
        skip,
        where:{
            AND:[
                {
                    OR:[
                        {purName:{contains:filter}},
                        {purSupp:{contains:filter}},
                        {purName:{contains:filter}}
                    ]
                }
            ]
        },
        orderBy:{
            createdAt:'asc'
        }
    })
    const totalPurchase = await prisma.purchase.count()
    const totalPages = Math.ceil(totalPurchase / takenValue)
    return res.status(200).json({
        purchase,
        pagination:{
            page:+page,
            totalPages
        }
    })
 }catch(error){
    return res.status(500).json({msg:error})
 } 
}

export const getSinglePurchase = async (req,res) =>{
    try{
        const purId = req.params.id
        if(!purId){
            return res.status(404).json({error:"not founded!"})
        }
        const singlePurchase = await prisma.purchase.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!singlePurchase){
            return res.status(404).json({error:"single custoemr not founded!"})
        }
        return res.status(200).json(singlePurchase)
    }catch(error){
        return res.status(500).json({msg:error})
    }
}