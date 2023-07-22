const express = require('express');
const { getAllMentors, createMentor, getMentorById, assignStudentsToMentor, showAssignedStudents } = require('../src/controller/mentorController');
const router = express.Router();


router.get('/', getAllMentors);         // Get a list of all available mentors.
router.post('/', createMentor);         // Create a New Mentor 
router.get('/:id', getMentorById);      // Get Mentor details by id
router.post('/:mentorId/assign-students', assignStudentsToMentor)   // Assign multiple students to a mentor
router.get('/assigned-students-mentor/:mentorId', showAssignedStudents);  // Get all students for a particular mentor


module.exports = router;