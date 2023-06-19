import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  handle: String,
  image: String,
  time: String,
  replies: Number, 
  retuits: Number,
  dislikes: Number,
  disliked: Boolean,
}, {collection: 'tuits'});
export default schema;