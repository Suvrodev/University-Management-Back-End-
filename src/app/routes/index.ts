import express from "express";
import { StudentRoutes } from "../Modules/student/student.route";
import { UserRoutes } from "../Modules/user/user.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
];

// router.use("/students", StudentRoutes);
// router.use("/users", UserRoutes);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
