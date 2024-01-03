import usersController from "./users.controller.js";
import authenticationController from "./authentication.controller.js";
import postsController from "./posts.controller.js";
import commentsController from "./comments.controller.js";

export const routes = (app, express) => {
  const router = express.Router();

  //   console.log("here");

  router.get("/", (req, res) => {
    return res
      .status(200)
      .send(
        "Welcome to Feed-App, Hope you are not having a bad day like me! :=( "
      );
  });

  app.use("/", router);
  app.use("/users", usersController);
  app.use("/auth", authenticationController);
  app.use("/posts", postsController);
  app.use("/comments", commentsController);
};
