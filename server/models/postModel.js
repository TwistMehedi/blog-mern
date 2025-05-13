import mongoose from "mongoose";

const reactionTypes = ["like", "dislike", "love", "haha", "sad", "angry"];

const reactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: reactionTypes, required: true },
  },
  { _id: false }
);

export const postSchema = new mongoose.Schema(
  {
    postTitle: { type: String, required: true, trim: true, maxlength: 50 },
    postDescription: { type: String, required: true, trim: true },
    subTitle:{type: String, required: true},
    category:{type: String , enum:["Helth", "Water", "Food", "Tech"], required: true},
    image: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    reactions: [reactionSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
