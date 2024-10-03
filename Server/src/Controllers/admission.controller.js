const admission=require('../Models/admission.model')


exports.create=(req,res)=>{
    const {
      name,
      age,
      passOutYear,
      sslcMark,
      hscMark,
      address,
      phone,
      courseName,
      email,
      gender,
      courseStartDate,
      courseEndDate,
      preferredTime,referredBy,
      counseledBy,
      mode,
    } = req.body;

    const Admission = new admission({
      name,
      age,
      passOutYear,
      sslcMark,
      hscMark,
      address,
      phone,
      courseName,
      email,
      gender,
      courseStartDate,
      courseEndDate,
       preferredTime,
      referredBy,
      counseledBy,
      mode,
    });
    Admission.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Something went worng",
      });
    });
}

exports.data=(req,res)=>{
  admission.find().then((user)=> res.send(user)).catch(err=>{
    res.status(400).send({
      message: err.message || "Somthing wrong",
    });
  })
}


exports.update=(req,res)=>{
if(!req.body){
  return res.status(400).send({
    message: "Pleace fill all requried field",
  });
}

const updateData={...req.body}
admission.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  )
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "user not found with id" + req.params.id,
      });
    }
    res.send(user);
  })
  .catch((err) => {
    if (!err.kind === "objectid") {
      return res.status(500).send({
        message: err.message || "user not found with id".req.params.id,
      });
    }
    return res.status(500).send({
      message: err.message || "Something went worng",
    });
  });
}


exports.delete=(req,res)=>{
  admission.findOneAndDelete({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found " + req.params.id });
      }
      res.send({ Message: "User Deleted Successfully!!!",data:user.data });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NOt Found") {
        return res
          .status(404)
          .send({ message: "User not found " + req.params.id });
      }
      return res.status(500).send({
        message: "Error getting user with id" + req.params.id,
      });
    });

}

//  const updateData = {};

//  if (req.body.name) updateData.name = req.body.name;
//  if (req.body.age) updateData.age = req.body.age;
//  if (req.body.passOutYear) updateData.passOutYear = req.body.passOutYear;
//  if (req.body.sslcMark) updateData.sslcMark = req.body.sslcMark;
//  if (req.body.hscMark) updateData.hscMark = req.body.hscMark;
//  if (req.body.address) updateData.address = req.body.address;
//  if (req.body.phone) updateData.phone = req.body.phone;
//  if (req.body.courseName) updateData.courseName = req.body.courseName;
//  if (req.body.email) updateData.email = req.body.email;
//  if (req.body.gender) updateData.gender = req.body.gender;
//  if (req.body.courseStartDate)
//    updateData.courseStartDate = req.body.courseStartDate;
//  if (req.body.courseEndDate) updateData.courseEndDate = req.body.courseEndDate;
//  if (req.body.preferredTime) updateData.preferredTime = req.body.preferredTime;
//  if (req.body.referredBy) updateData.referredBy = req.body.referredBy;
//  if (req.body.counseledBy) updateData.counseledBy = req.body.counseledBy;
//  if (req.body.mode) updateData.mode = req.body.mode;