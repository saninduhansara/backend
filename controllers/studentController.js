import Student from "../models/student.js"

// export  function getStudents (req,res){
//         Student.find().then(
//             (students)=>{
//                 res.json(students)
//             }
//         ).catch(
//             ()=>{
//                 res.json({
//                     message: "Error fetching students"
//                 })
//             }
//         )

    
//     }


export async function getStudents(req, res){
    try{
        const students = await Student.find()
        res.json(students)
    }catch(error){
        res.status(500).json({
            message : "Failed",
            error : error.message
        })

    }
}
export function createStudent (req,res){
    if (req.user == null){
        res.status(403).json({
            message : "Please login to create a student"
        })
        return
    }
    if(req.user.role != "admin"){
        res.status(403).json({
            message : "Please login as admin to create a student"
        })
        return
    }

    
    console.log(req.body)
    const student = new Student(
        {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    )
    student.save().then(()=>{
        res.json({
            message: "Student saved successfully"
        })
    }).catch(
        ()=>{
            console.log("Error saving student")
        }
    )
}