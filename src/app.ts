import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./app/config";
import { StudentRoutes } from "./app/Modules/student/student.route";
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

//Router
app.use("/api/v1/students", StudentRoutes);

const controllerFunction = (req: Request, res: Response) => {
  res.send(`Student Management server is run on port: ${config.port}`);
};

app.get("/", controllerFunction);
// app.get("/", (req: Request, res: Response) => {
//   res.send(`Student Management is running on port: ${config.port} `);
// });

export default app;
