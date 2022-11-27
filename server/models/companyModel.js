const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const companyModel = new model("company", userSchema);
module.exports = companyModel;
