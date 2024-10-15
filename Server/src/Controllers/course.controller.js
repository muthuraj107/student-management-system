const course=require('../Models/course.model');

exports.create=(req,res)=>{
    const { courseName, courseFees } = req.body;
    const Course = new course({
      courseName,
      courseFees,
    });

    Course.save().
    then(user=>res.send(user)).catch((err) => {
      return res.status(500).send({
        message: err.message || "Something went wrong",
      })
    })
    
}

exports.data=(req,res)=>{
  course.find().then((user)=>res.send(user))
  .catch((err)=>{
    return res.status(404).send({
      message:err.message||"Something went worng"
    })
  })


}
///update course
exports.update = (req,res) =>{
    if(!req.body){
        return res.status(404).send({
            message:"please fill all the required fields"
        })
    }
    //find course and update
    course.findByIdAndUpdate(req.params.id,{   
    courseName: req.body.courseName,
    courseFees: req.body.courseFees
       
    },{new:true})
    .then(user =>{
        if(!user){
            return res.status(404).send({
                message:"user not found"+req.params.id
            })
        }
        res.send(user)
    }).catch(err =>{
        if(err.kind ==='objectId'){
            return res.status(404).send({
                message:'user id not found'+ req.params.id
            })
        }
        return res.status(500).send({
            message:"error updating user id"+ req.params.id
        })
    })
    }

   //delete one course 
   exports.remove =(req,res)=>{
    course.findOneAndDelete({_id: req.params.id})
    .then((user) =>{
        if(!user) {
            return res.status(404).send({
                message:"user not found "+req.params.id
            })
        }
        res.send({
            message:"successfully deleted "+req.params.id
        })
    }).catch(err =>{
        if(err.kind ==='objectId'){
            return res.status(404).send({
                message:'user id not found '+ req.params.id
            })
        }
        return res.status(500).send({
            message:"error in getting user id "+ req.params.id
        })
    })
}
