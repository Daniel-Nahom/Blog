const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const isEmpty = require("lodash.isempty");

exports.getPosts = (req, res, next) => {
  try {
    const posts = db.get("posts").value();
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addPost = (req, res, next) => {
  try {
    if (isEmpty(req.body)) {
      //respond with an error
      const error = new Error("Request body is Empty");
      error.status = 400; // 400 -> bad request
      error.stack = null;
      next(error);
    } else {
      const post = req.body;
      console.log(post);
      db.get("posts")
        .push(post)
        .last()
        .assign({
          id: Date.now().toString(),
        })
        .write();
      res.status(201).send(post);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updatePost = (req, res, next) => {
  console.log(req.body);
  try {
    if (isEmpty(req.body)) {
      const error = new Error("Request body is Empty");
      error.status = 400;
      error.stack = null;
      next(error);
    } else {
      const postId = req.body.post.id;
      const post = db.get("posts").find({ id: postId }).value();
      console.log(post);
      db.get("posts")
        .find({ id: postId })
        .assign({
          title: req.body.post.title,
          content: req.body.post.content,
        })
        .write();
      res.status(201).send(post);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePost = (req, res, next) => {
  console.log(req.body)
  try {
    if (isEmpty(req.body)) {
      const error = new Error("Request body is Empty");
      error.status = 400;
      error.stack = null;
      next(error);
    } else {
      const postId = req.body.id;
      db.get("posts").remove({ id: postId }).write();
      res.status(200).send("SUCCESS");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
