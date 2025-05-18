import Post from "../models/postModel.js";
import { deleteImage, uploadMedia } from "../utils/cloudinay.js";

export const createPost = async (req, res) => {
  try {
    const { postTitle, subTitle, postDescription, category } = req.body;
    // console.log(category);
    const file = req.file;
    if (!postTitle || !subTitle || !postDescription || !category) {
      return res.status(400).json({
        message: "Somthing is missing",
        success: false,
      });
    }

    const image = file
      ? await uploadMedia(file.path)
      : { public_id: "", url: "" };

    const post = await Post.create({
      postTitle,
      subTitle,
      postDescription,
      category,
      image: {
        public_id: image.public_id,
        url: image.url,
      },
      user: req.id,
      isPublished: true,
    });

    return res.status(201).json({
      message: "Post created successfull",
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Internal server post create error ${error.message}`,
      success: false,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postTitle, postDescription, category } = req.body;
    const file = req.file;
    const userId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: `Post not found`,
        success: false,
      });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized: You can't edit this post",
        success: false,
      });
    }

    if (file) {
      if (post.image && post.image.public_id) {
        await deleteImage(post.image.public_id);
      }
    }

    if (postTitle) post.postTitle = postTitle;
    if (postDescription) post.postDescription = postDescription;
    if (category) post.category = category;

    const cloudResponse = await uploadMedia(file.path);
    post.image = {
      public_id: cloudResponse.public_id,
      url: cloudResponse.secure_url,
    };

    post.isPublished = true;

    const updatePostData = await post.save();
    return res.status(200).json({
      message: "Post update successfull",
      success: true,
      updatePostData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Internal server post update error ${error.message}`,
      success: false,
    });
  }
};

export const getSingleUserAllPosts = async (req, res) => {
  try {
    const userId = req.id;
    const posts = await Post.find({ user: userId })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("reactions");

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found for this user", success: false });
    }

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      title: post.postTitle,
      description: post.postDescription,
      subtitle: post.subTitle,
      image: post.image,
      reactions: Array.isArray(post.reactions) ? post.reactions.length : 0,
      commentCount: Array.isArray(post.comments) ? post.comments.length : 0,
      createdAt: post.createdAt,
    }));

    return res.status(200).json({
      message: "Single user all post founded",
      success: true,
      posts: formattedPosts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Internal server get single user all post error ${error.message}`,
      success: false,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "name")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name" },
      })
      .populate("reactions");

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found", success: false });
    }

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      postTitle: post.postTitle,
      postDescription: post.postDescription,
      category: post.category,
      image: post.image,
      user: post.user,
      reactions: Array.isArray(post.reactions) ? post.reactions?.length : 0,
      comments: post.comments?.map((comment) => ({
        _id: comment._id,
        text: comment.text,
        user: comment.user,
        createdAt: comment.createdAt,
      })),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    return res.status(200).json({
      message: "Get all post founded",
      success: true,
      posts: formattedPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server get all post error ${error.message}`,
      success: false,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("user", "name")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .populate("reactions");

    const formattedComments = post.comments?.map((comment) => ({
      _id: comment._id,
      text: comment.text,
      user: comment.user,
      createdAt: comment.createdAt,
    }));

    const formattedPosts = {
      _id: post._id,
      title: post.postTitle,
      description: post.postDescription,
      user: post.user,
      reactions: post.reactions?.map((react) => ({
        user: react.user,
        react,
      })),
      comments: formattedComments,
      createdAt: post.createdAt,
    };

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }
    return res.status(200).json({
      message: "Single user post founded",
      success: true,
      post: formattedPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server get single user post error ${error.message}`,
      success: false,
    });
  }
};

export const reactions = async (req, res) => {
  try {
    const { postId, action } = req.body;
    if (!postId || !action) {
      return res
        .status(400)
        .json({ message: "postId and action are required", success: false });
    }

    const actionType = ["like", "dislike", "love", "haha", "sad", "angry"];
    if (!actionType.includes(action)) {
      return res
        .status(400)
        .json({ message: "Invalid reaction type", success: false });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    const userId = req.id;
    post.reactions = post.reactions.filter(
      (reaction) => reaction.user.toString() !== userId.toString()
    );

    post.reactions.push({ user: userId, action });

    await post.save();

    return res.status(200).json({
      message: `Reacted with "${type}"`,
      success: true,
      reactions: post.reactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server like and deslike post error ${error.message}`,
      success: false,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.id;
    const post = await Post.findById(postId)
      .populate("reactions")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name" },
      });

    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    await Post.findByIdAndDelete(post, { user: userId });

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.statsu(500).json({
      message: "Post delete problem" + error.message,
      success: false,
    });
  }
};
