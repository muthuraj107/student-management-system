const mongoose = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const staffSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    is_login: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
staffSchema.plugin(AutoIncrementFactory(mongoose), { inc_field: "staffId" });

module.exports = mongoose.model("staff", staffSchema);