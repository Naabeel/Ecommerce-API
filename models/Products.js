const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  [
    {
      id: {
        type: Number,
        require: true,
        hidden: true,
      },
      name: {
        type: String,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
