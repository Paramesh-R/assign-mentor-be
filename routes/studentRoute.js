const express = require('express');
const { createStudent, getAllStudents, getStudentsWithoutMentor, getStudentById, assignMentorToStudent, unassignMentorFromStudent } = require('../src/controller/studentController');
const { showAssignedStudents } = require('../src/controller/mentorController');
const router = express.Router();

router.get('/', getAllStudents);        // Get a list of all students.
router.post('/', createStudent);        // Create a new student
router.get('/students-without-mentor', getStudentsWithoutMentor);
router.get('/:id', getStudentById);     // Get Student details by id
router.post('/:studentId/assign-mentor/:mentorId', assignMentorToStudent)
router.put('/:studentId/assign-mentor/:mentorId', assignMentorToStudent)
router.delete('/:studentId/assign-mentor/', unassignMentorFromStudent)


// router.get('/', showAssignedStudents);

module.exports = router;

