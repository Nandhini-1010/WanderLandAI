const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  images: {
    type: [String], // Cloudinary URLs later
    default: [],

  aiEnhancement: {
  type: String,
  default: "",
},
  },

user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Journal", journalSchema);