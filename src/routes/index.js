const { Router } = require("express");

const userRouter = require("./user.routes"); //variável (userRouter) que vai traçar a  rota para user
const notesRouter = require("./notes.routes");//variável (notesRouter) que vai traçar a  rota para notes
const tagsRouter = require("./tags.routes");//variável (tagsRouter) que vai traçar a  rota para tags
const sessionsRouter = require("./sessions.routes");//variável (sessionsRouter) que vai traçar a  rota para sessions

const routes = Router();

routes.use("/user", userRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;