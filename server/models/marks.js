import mongoose from "mongoose";
const { Schema } = mongoose;

const marksSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: "test",
  },
  student: {
    type: String,
    ref: "student",
  },
  internalMarks: {
    type: String,
    default: -1,
  },
  practicalMarks: {
    type: String,
    default: -1,
  },

  externalMarks: {
    type: String,
    default: -1,
  },
  gredePoint: {
    type: String,
    default: -1,
  },
  // marks: {
  //   type: Number,
  //   default: -1,
  // },
  subject: {
    type: String,
    default: -1,
  },
  subjectCode: {
    type: String,
    default: -1,
  },
});

export default mongoose.model("marks", marksSchema);
