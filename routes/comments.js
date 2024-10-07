import { Router } from "express";
import { comments } from "../data/comments.js";
import { error } from "../utils/error.js";

const commentsRouter = Router();

/**
 * GET
 */
commentsRouter.get("/", (req, res, next) => {
  console.log(req.query);
  console.log("APIKEY:::", req.key);

  res.json(comments);
});

/**
 * GET by id
 */
commentsRouter.get("/:id", (req, res, next) => {
  console.log(req.params);
  const comment = comments.find((comment) => comment.id == req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    next(error(404, "Not found!"));
  }
});

/**
 * POST
 */
commentsRouter.post("/", (req, res) => {
  console.log(req.body);

  if (req.body.userId && req.body.postId && req.body.body) {
    if (comments.find((c) => c.postId == req.body.postId)) {
      res.json({ error: "Comment already exists" });
    }

    const comments = {
      id: comments[comments.length - 1].id + 1,
      userId: req.body.userId,
      postId: req.body.postId,
      body: req.body.body,
    };
    comments.push(comments);
    res.json(comments[comments.length - 1]);
  }
});

/**
 * PATCH OR UPDATE by id
 */
commentsRouter.patch("/:id", (req, res, next) => {
    console.log(req.params);

    const comment = comments.find((c, i) => {
        if(c.id == req.params.id) {
          for (const key in req.body) {
            comments[i][key] = req.body[key];
          }  
          return true;
        }
    })
    if(comment) res.json(comment);
    else next();
})

/**
 * DELETE by id
 */
commentsRouter.delete("/:id", (req, res, next) => {
    console.log(req.params);

    const comment = comments/find((c, i) => {
        if(c.id == req.params.id) {
            users.splice(i, 1);
            return true;
        }
    });
    if(comment) res.json(comment);
    else next();
})


export default commentsRouter;
