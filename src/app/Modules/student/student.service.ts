import { TStudent } from "./student.interface";
import { studentModel } from "./student.model";

///ctrate Student
const createStudentIntoDB = async (studentData: TStudent) => {
  const result = await studentModel.create(studentData);
  return result;
};

//get All students
const getAllStudentsFromDB = async () => {
  const result = await studentModel.find();
  return result;
};

//get All students
const getSingleStudentsFromDB = async (id: string) => {
  const result = await studentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
};
