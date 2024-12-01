import { TStudent, TStudentModel } from "./student.interface";
import { StudentModel } from "./student.model";

//get All students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

//get All students
const getSingleStudentsFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};

//Delete Student
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentFromDB,
};
