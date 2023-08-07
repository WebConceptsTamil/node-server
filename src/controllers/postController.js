import Post from "../model/postModel.js";

// Get all the Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Create a Post
const createPost = async (req, res) => {
  const { title, description } = req.body;

  try {
    // create user
    const post = await Post.create({
      title,
      description,
    });
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get single post
const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404);
      return res.status(404).json({ message: `Post not found` });
    }
    res.status(200).json({ post });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    res.status(500).json({ message: error.message });
  }
};

// Update Post
const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404);
      return res.status(404).json({ message: `Post not found` });
    }
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    const updatedPost = await post.save();
    res.status(200).json({
      id: updatedPost._id,
      title: updatedPost.title,
      description: updatedPost.description,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: `Post not found` });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getPosts, getSinglePost, updatePost, deletePost };
