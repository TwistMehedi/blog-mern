import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.id;
    const postId = req.params.id;

    if (!text) {
      return res.status(404).json({
        message: "Somthing is missing",
        success: false,
      });
    }

    const comment = await Comment.create({
      text,
      user: userId,
      post: postId,
    });

    const post = await Post.findById(postId);

    post.comments.push(comment);
    await post.save();

    return res.status(201).json({
      message: "Comment created successfully",
      success: true,
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server comments error",
      success: false,
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");

    res.status(202).json({
      message: "Comments gotted",
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server comment get error",
      success: false,
    });
  }
};
