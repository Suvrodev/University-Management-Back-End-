import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

///Get All Students
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Successfully Retrive Students",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

///Get Single Student
const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(id);
    res.status(200).json({
      success: true,
      message: "Successfully Retrive Students",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

///Get Single Student
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
    res.send({
      success: true,
      message: "Student is deleted Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
