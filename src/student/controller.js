const pool = require("../../db");
const queries = require("./queries");

const getStudents = (request, response) => {
  pool.query(queries.getAllStudents, (error, result) => {
    if (error) throw error;
    response.status(200).json(result.rows);
  });
};

const getStudentById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(queries.getStudentById, [id], (error, result) => {
    if (error) throw error;
    // console.log(result);
    response.status(200).json(result.rows);
  });
};

const addStudent = (request, response) => {
  const { name, email, age, dob } = request.body;

  // check if email exists
  pool.query(queries.checkEmailExists, [email], (error, result) => {
    if (result.rows.length) {
      response.send("Email already exists !!");
    }

    // add student to the database
    pool.query(queries.addStudent, [name, email, age, dob], (error, result) => {
      if (error) throw error;
      response.status(201).send("Data added Successfully!");
      console.log("Student Created");
    });
  });
};

const deleteStudentById = (request, response) => {
  const params_id = parseInt(request.params.id);
  let id;
  if (params_id) {
    id = params_id;
  } else {
    response.send("Please enter proper id");
    return;
  }
  pool.query(queries.getStudentById, [id], (error, result) => {
    if (error) throw error;
    const noStudentFound = !result.rowCount;
    if (noStudentFound) {
      response.send("No Student exists with this id in the database!!");
      return;
    }
    pool.query(queries.deleteStudentById, [id], (error, result) => {
      if (error) throw error;
      console.log("Student Deleted");
      response.send(`Student Deleted successfully with id -> ${id}`);
    });
  });
};

const updateStudentName = (request, response) => {
  const params_id = parseInt(request.params.id);
  let id;
  if (params_id) {
    id = params_id;
  } else {
    response.send("Please enter proper id ");
    return;
  }

  const { name } = request.body;
  pool.query(queries.getStudentById, [id], (error, result) => {
    const noStudentFound = !result.rowCount;
    if (noStudentFound) {
      response.send(`No Student found wit id ${id}`);
      return;
    }
    pool.query(queries.updateStudentName, [name, id], (error, result) => {
      if (error) throw error;

      response.send(`Student updated with value ${name}`);
      console.log("Student value updated");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudentById,
  updateStudentName,
};
