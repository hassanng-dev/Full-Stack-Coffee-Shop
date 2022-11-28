const Comment = require("../models/Comments");


module.exports = {
  
  createComment: async (req, res) => {
    console.log("Comment was created")
    try {
        await Comment.create({
        comments: req.body.comments,
        postID: req.params.id,
        user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err, "Hi!");
    }
  }

}
