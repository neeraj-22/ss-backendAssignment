const mongoose = require("mongoose");

const statSchema = mongoose.Schema({

  tokensUsed: {
    type: Number,
    default : 0
  },

  wordsUsed : {
    type:Number,
    default : 0
  },
  
  charactersUsed: {
    type: Number,
    default : 0
  }
  
});

module.exports = mongoose.model("Stats", statSchema);
