import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Referencing the User model
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    summery : {
        type : String,
        required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isAuthorizedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;
