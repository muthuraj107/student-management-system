const staff=require('../Models/staff.model');

exports.create=(req,res)=>{
   const{name,email,password}=req.body;

   const Staff=new staff({
    name,email,password
   })

   Staff.save()
     .then((data) => {
       res.send(data);
     })
     .catch((err) => {
       return res.status(500).send({
         message: err.message || "Something went worng",
       });
     });

}


exports.data = (req, res) => {
  staff
    .find()
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Somthing wrong",
      });
    });
};

exports.update=(req,res)=>{
const updateData = { ...req.body };
  staff
    .findByIdAndUpdate(req.params.id, updateData, { new: true })
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

exports.delete = (req, res) => {
  staff
    .findOneAndDelete({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found " + req.params.id });
      }
      res.send({ Message: "User Deleted Successfully!!!", data: user.data });
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
};


//login s
exports.login=(req,res)=>{
   const { email, password } = req.body;
     staff
       .findOne({ email })
       .then((user) => {
if (!user) {
  return res.status(404).json({ message: "User not found" });
}
if (user && user.password === password) {
  res.json({ success: true });
} else {
  res.json({ success: false });
}
       })
       .catch((err) => {
         console.log("Error Login", err);
         return res.status(500).json({ message: "Something went wrong " });
       });
    
}