import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

//create Students
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = await req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
