import getPrismaInstant from "../lib/prisma.js"

const prisma = getPrismaInstant()

export const getProduct = async (req,res) =>{
 try{
    const {filter = '' , taken = "5" , page = '1'} = req.query
    
    let takenValue = +taken;
    let skip = (+page - 1) * takenValue
    
    const product = await prisma.product.findMany({
        take:takenValue,
        skip,
        where:{
            AND:[
                {
                    OR:[
                        {prodItemName:{contains:filter}},
                        {prodBus:{contains:filter}}
                    ]
                }
            ]
        },
        orderBy:{
            createdAt:'asc'
        }
    })
    const totalProduct = await prisma.product.count()
    const totalPages = Math.ceil(totalProduct / takenValue)
    return res.status(200).json({
        product,
        pagination:{
            page:+page,
            totalPages
        }
    })
 }catch(error){
    return res.status(500).json({msg:error})
 } 
}

export const getSingleProduct = async (req,res) =>{
    try{
        const prodId = req.params.id
        if(!prodId){
            return res.status(404).json({error:"not founded!"})
        }
        const singleProduct = await prisma.product.findUnique({
            where:{
                id:Number(prodId)
            }
        })
        if(!singleProduct){
            return res.status(404).json({error:"single custoemr not founded!"})
        }
        return res.status(200).json(singleProduct)
    }catch(error){
        return res.status(500).json({msg:error})
    }
}