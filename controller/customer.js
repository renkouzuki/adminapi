import getPrismaInstant from "../lib/prisma.js"

const prisma = getPrismaInstant()

export const getCustomer = async (req,res) =>{
 try{
    const {filter = '' , taken = "5" , page = '1'} = req.query
    
    let takenValue = +taken;
    let skip = (+page - 1) * takenValue
    
    const customer = await prisma.customer.findMany({
        take:takenValue,
        skip,
        where:{
            AND:[
                {
                    OR:[
                        {cusName:{contains:filter}},
                        {cusBus:{contains:filter}}
                    ]
                }
            ]
        },
        orderBy:{
            createdAt:'asc'
        }
    })
    const totalCustomer = await prisma.customer.count()
    const totalPages = Math.ceil(totalCustomer / takenValue)
    return res.status(200).json({
        customer,
        pagination:{
            page:+page,
            totalPages
        }
    })
 }catch(error){
    return res.status(500).json({msg:error})
 } 
}

export const getSingleCustomer = async (req,res) =>{
    try{
        const cusId = req.params.id
        if(!cusId){
            return res.status(404).json({error:"not founded!"})
        }
        const singleCustomer = await prisma.customer.findUnique({
            where:{
                id:Number(cusId)
            }
        })
        if(!singleCustomer){
            return res.status(404).json({error:"single custoemr not founded!"})
        }
        return res.status(200).json(singleCustomer)
    }catch(error){
        return res.status(500).json({msg:error})
    }
}