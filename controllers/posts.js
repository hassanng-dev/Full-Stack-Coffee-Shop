const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");




module.exports = {
  getProfile: async (req, res) => {
    try {
      const name = await Post.find({name : req.body.name})
      const completed = await Post.find({orderStatus: "completed"})
      const pending = await Post.find({orderStatus: "pending"})

      res.render("profile.ejs", {name: name, completed: completed, pending: pending});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const posts = await Post.find({name: req.body.name});
      res.render("profile.ejs", { posts: posts, name: req.body.name, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      
      console.log(req.body)
      await Post.create({
        name: req.body.name,
        size: req.body.size,
        coffee: req.body.coffee,
        temp: req.body.temp,
        user: req.user,
      });
      console.log("Order has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },

  completed: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          orderStatus: "completed",
          barista: req.user.userName
        }
      );
      console.log("completed");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Order");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
