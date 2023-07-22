const MentorModel = require('../models/MentorModel');
const Student = require('../models/StudentModel');

// Retrieve all students from the database. 
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error });
    }
};

// Add New Student to Database
exports.createStudent = async (req, res) => {
    try {
        const { name } = req.body;

        // Create a new student
        const student = new Student({ name });

        // Save the student to the database
        await student.save();

        console.log(`Student created successfully`)

        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        console.log(`error occurred while creating new student: ${error.message}`)

        res.status(500).json({ error: 'An error occurred' });
    }
}

// Retrieve student Details by :ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error });
    }
};


// Controller function: Assign the mentor with mentorId to the student with studentId in the database.
// Controller function: Update the assigned mentor for the student with studentId in the database.
exports.assignMentorToStudent = async (req, res) => {
    try {
        const { studentId, mentorId } = req.params;

        // Check if both student and mentor exist
        const student = await Student.findById(studentId);
        const mentor = await MentorModel.findById(mentorId);

        if (!student || !mentor) {
            return res.status(404).json({ message: 'Student or Mentor not found' });
        }

        console.log(mentor);
        // Assign mentor to the student
        const prevMentor = student.mentor;
        student.previousMentor = prevMentor ;
        await student.save();
        student.mentor = mentor;
        await student.save();

        res.status(200).json({ message: 'Mentor assigned to student successfully',updatedStudent: student });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning mentor to student', error });
    }
};



// Remove the mentor assignment for the student with studentId in the database.
exports.unassignMentorFromStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Check if student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Unassign mentor from the student
        student.mentor = null;
        await student.save();

        res.status(200).json({ message: 'Mentor unassigned from student successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error reassigning mentor from student', error });
    }
};



exports.getStudentsWithoutMentor = async (req, res) => {
    console.log("Students without mentor")
    try {
        // Find all the students without a Mentor
        const students = await Student.find({ mentor: { $exists: false } });

        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}
















/* 

exports.assignstudent = async (req, res) => {
    try {
        const { studentId } = req.body;

        // Find the student and student by their IDs
        const student = await Student.findById(studentId);

        // Assign the student to the student
        student.student = student;

        // Save the updated student
        await student.save();

        res.status(200).json({ message: 'student assigned successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}


 */