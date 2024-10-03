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
        message: err.message || "Something went worng",
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

