import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./app/config";
import { StudentRoutes } from "./app/Modules/student/student.route";
import { UserRoutes } from "./app/Modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

//Router
app.use("/api/v1", router);

const testController = (req: Request, res: Response) => {
  res.send(`Student Management server is run on port: ${config.port}`);
};

app.get("/", testController);
// app.get("/", (req: Request, res: Response) => {
//   res.send(`Student Management is running on port: ${config.port} `);
// });

app.use(globalErrorHandler);

//Not Found Route
app.use(notFound);

export default app;
