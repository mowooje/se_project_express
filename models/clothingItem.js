const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },

  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },

  imageUrl: {
    type: String,
    required: [true, "The imageUrl field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    required: true,
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("item", clothingItemSchema);
