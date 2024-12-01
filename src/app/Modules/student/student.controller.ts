import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

///Get All Students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.send({
      success: true,
      message: "Successfully Retrive Students",
      data: result,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

///Get Single Student
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(id);
    res.send({
      success: true,
      message: "Successfully Retrive Students",
      data: result,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

///Get Single Student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
    res.send({
      success: true,
      message: "Student is deleted Successfully",
      data: result,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
