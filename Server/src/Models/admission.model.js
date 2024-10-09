const mongoose = require("mongoose");
//authincrement for the std_id
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 1 },
});
const Counter = mongoose.model("Counters", counterSchema);

Counter.getNextSequenceValue = async function (sequenceName) {
  const counter = await this.findByIdAndUpdate(
    sequenceName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

const addmissionSchema = mongoose.Schema(
  {
    stdId: { type: Number },
    name: { type: String, required: true },
    age: Number,
    passOutYear: String,
    sslcMark: String,
    hscMark: String,
    address: String,
    phone: String,
    courseName: String,
    courseFees: Number,
    email: { type: String, required: true },
    gender: String,
    currentPayment: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    pendingAmount: { type: Number, default: 0 },
    courseStartDate: String,
    courseEndDate: String,
    preferredTime: String,
    referredBy: String,
    counseledBy: String,
    mode: String,
    degree: String,
    is_active: { type: Boolean, default: false },
    is_login: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtual: true }, // Include virtuals in JSON
    toObject: { virtual: true }, // Include virtuals in objects
  }
);

addmissionSchema.pre("save", async function (next) {
  if (!this.stdId) {
    this.stdId = await Counter.getNextSequenceValue("stdId");
  }
  this.paidAmount += this.currentPayment;
  this.pendingAmount = this.courseFees - this.paidAmount;
  next();
});

addmissionSchema.methods.calculateAmounts = function () {
  this.paidAmount += this.currentPayment;
  this.pendingAmount = this.courseFees - this.paidAmount;
};
module.exports = mongoose.model("addmission", addmissionSchema);
