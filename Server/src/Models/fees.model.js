const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    std_id: Number,
    courseName:String,
    fees: Number,
    currentPayment: Number,
    pendingAmount: Number,
    paidAmount: Number,
  },
  {
    timestamps: true,
  }
);


feeSchema.methods.calculateAmounts = function () {
  this.paidAmount += this.currentPayment;
  this.pendingAmount = this.fees - this.paidAmount;
};
const Fee = mongoose.model("Fee", feeSchema);
module.exports = Fee;
