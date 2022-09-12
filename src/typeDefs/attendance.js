import { gql } from "apollo-server-express";

const attendanceType = gql`
  type studentD {
    student: ID
    status: Boolean
  }
  type AttendanceModel {
    id: ID
    faculty: ID
    students: [studentD]
  }

  type studentData {
    student: studentModel
    status: Boolean
  }
  type attendanceModel {
    id: ID
    faculty: facultyModel
    students: [studentData]
  }

  type Query {
    getAllAttendance: [attendanceModel]
    getAttendance(id: ID!): attendanceModel
  }
  input CreateAttendanceInput {
    faculty: ID!
  }
  input AddAttendanceInput {
    student: ID!
    status: Boolean!
  }
  input UpdateAttendanceInput {
    status: Boolean!
  }
  type Mutation {
    createAttendance(
      createattendancemodel: CreateAttendanceInput
    ): AttendanceModel
    addAttendance(
      id: ID!
      addattendancemodel: AddAttendanceInput
    ): AttendanceModel
    updateAttendance(
      id: ID!
      sid: ID!
      updateattendancemodel: UpdateAttendanceInput
    ): AttendanceModel
    deleteAttendance(id: ID!): String
  }
`;

export default attendanceType;
