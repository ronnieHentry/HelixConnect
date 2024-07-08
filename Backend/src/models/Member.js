const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  admissionNumber: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  feePaymentHistory: [
    {
      month: { type: String, required: true },
      year: { type: Number, required: true },
      amountPaid: { type: Number, required: true },
    },
  ],
});

const Member = mongoose.model("Members", memberSchema);

module.exports = Member;
