import { Router } from "express";
import { posts } from "../data/posts.js";
import { error } from "../utils/error.js";

const postsRouter = Router();

/**
 * GET
 */
postsRouter.get("/", (req, res) => {
  res.json(posts);
});

/**
 * GET by id
 */
postsRouter.get("/:id", (req, res, next) => {
  console.log(req.params);
  const post = posts.find((post) => post.id == req.params.id);

  if (post) {
    res.json(post);
  } else {
    next(); // calls the custom 404 middleware
  }
});

/**
 * POST
 */
postsRouter.post("/", (req, res) => {
  console.log(req.body);
  
  if(req.body.name && req.body.username & req.body.email) {
    if (posts.find((u) => u.username == req.body.username)) {
      res.json({error: "Username Already Taken"});
      return;
    }

    const post = {
      id: posts[posts.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };
    posts.push(post);
    res.json(posts[posts.length - 1]);
  }
})

/**
 * PATCH OR UPDATE by id
 */
postsRouter.patch("/:id", (req, res, next) => {
  console.log(req.params);

  const post = posts.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});

/**
 * DELETE by id
 */
postsRouter.delete("/:id", (req, res, next) => {
  console.log(req.params);

  const post = posts.find((u, i) => {
    if (u.id == req.params.id) {
      posts.splice(i, 1);
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});


export default postsRouter;