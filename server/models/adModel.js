const { Schema, model } = require("mongoose");

const adSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    companyId: {
      type: String,
      required: true,
    },
    primaryText: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    CTA: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

adSchema.virtual("company", {
  ref: "company",
  localField: "companyId",
  foreignField: "_id",
});

const adModel = new model("ad", adSchema);
module.exports = adModel;
