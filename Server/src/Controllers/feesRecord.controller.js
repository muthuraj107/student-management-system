
const fee =require('../Models/fees.model')
exports.updatepayment = async (req, res) => {
  if (!req.body.currentPayment) {
    return res.status(400).send({
      message: "Please provide the currentPayment value",
    });
  }

  try {
    // Find the fee record by its ID
    const fee = await Fee.findById(req.params.id).populate("course"); // Populating the 'course' to access its fees

    if (!fee) {
      return res.status(404).send({
        message: "Fee record not found with id " + req.params.id,
      });
    }

    // Update the current payment
    const currentPayment = req.body.currentPayment;
    fee.currentPayment = currentPayment;

    // Recalculate paid and pending amounts
    fee.paid = fee.paid + parseInt(currentPayment); // Add the current payment to the previously paid amount
    fee.pending = fee.course.fees - fee.paid; // Subtract the total paid amount from the course fees

    // Save the updated fee document
    const updatedFee = await fee.save();

    res.send(updatedFee);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error updating payment with id " + req.params.id,
    });
  }
};


 const admission = require("../Models/admission.model");
 const Course = require("../Models/course.model");

// exports.createFees = async (req, res) => {
//   const { id, courseName, paymentAmount } = req.body;

//   // Find the student and course
//   const student = await admission.findOne({ _id: id });
//   const course = await Course.findOne({ courseName: courseName });

//   console.log(student, course);

//   if (!student || !course) {
//     return res.status(404).send({ message: "Student or course not found" });
//   }

//   // Create a new fees document
//   const feeDoc = new fee({
//     std_id: student.stdId,
//     courseName: course.courseName,
//     fees: parseInt( course.courseFees),
//     currentPayment: paymentAmount,
//   });

//   // Calculate the paid amount and pending amount
//   feeDoc.calculateAmounts();

//   // Save the fees document
//   feeDoc
//     .save()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       return res.status(500).send({
//         message: err.message || "Something went wrong",
//       });
//     });
// };

exports.createFees = async (req, res) => {
  const { id, courseName, paymentAmount } = req.body;

  // Find the student and course
  const student = await admission.findOne({ _id: id });
  const course = await Course.findOne({ courseName: courseName });

  console.log(student, course);

  if (!student || !course) {
    return res.status(404).send({ message: "Student or course not found" });
  }

  // Create a new fees document
  const feeDoc = new fee({
    std_id: student.stdId,
    fees: course.courseFees,
    currentPayment: paymentAmount,
  });

  // Calculate the paid amount and pending amount
  feeDoc.calculateAmounts();

  // Save the fees document
  feeDoc
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};