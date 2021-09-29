const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    //TODO: Change userId & sitterId to references
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    sitterId: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v >= this.startDate;
        },
        message: "End date must come on or after start date.",
      },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Request = mongoose.model("Request", requestSchema);
