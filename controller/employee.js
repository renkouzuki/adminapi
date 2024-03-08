import getPrismaInstant from "../lib/prisma.js"

const prisma = getPrismaInstant()

export const getEmployee = async (req,res) =>{
 try{
    const {filter = '' , taken = "5" , page = '1'} = req.query
    
    let takenValue = +taken;
    let skip = (+page - 1) * takenValue
    
    const employee = await prisma.emp.findMany({
        take:takenValue,
        skip,
        where:{
            AND:[
                {
                    OR:[
                        {empName:{contains:filter}},
                        {empGender:{contains:filter}},
                        {empOcc:{cotnains:filter}}
                    ]
                }
            ]
        },
        orderBy:{
            createdAt:'asc'
        }
    })
    const totalEmployee = await prisma.cus.count()
    const totalPages = Math.ceil(totalEmployee / takenValue)
    return res.status(200).json({
        employee,
        pagination:{
            page:+page,
            totalPages
        }
    })
 }catch(error){
    return res.status(500).json({msg:error})
 } 
}

export const getSingleEmployee = async (req,res) =>{
    try{
        const empId = req.params.id
        if(!empId){
            return res.status(404).json({error:"not founded!"})
        }
        const singleEmployee = await prisma.emp.findUnique({
            where:{
                id:Number(empId)
            }
        })
        if(!singleEmployee){
            return res.status(404).json({error:"single custoemr not founded!"})
        }
        return res.status(200).json(singleEmployee)
    }catch(error){
        return res.status(500).json({msg:error})
    }
}