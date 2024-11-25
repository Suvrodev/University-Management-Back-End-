import { Request, Response } from "express";
import { StudentServices } from "./student.service";

//create Students
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await req.body;

    const result = await StudentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something going wrong",
    });
  }
};

///Get All Students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.send({
      success: true,
      message: "Successfully Retrive Students",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
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
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
