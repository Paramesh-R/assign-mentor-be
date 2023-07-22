const { default: mongoose } = require('mongoose');
const Mentor = require('../models/MentorModel');
const Student = require('../models/StudentModel');

// Retrieve all available mentors from the database.
exports.getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving mentors', error });
    }
};

// Add New Mentor to Database
exports.createMentor = async (req, res) => {
    try {
        const { name } = req.body;

        /*  const mentorExists = await Mentor.find(name);
         if (mentorExists) {
             return res.status(500).json({ "message": "Mentor name already exists" })
         } */
        // Create a new mentor
        // const mentor = new Mentor({ name })
        // const newMentor = await Mentor.create({ name })

        // if (!newMentor) { return res.status(500).json({ message: "Something went wrong" }); }

        const existingMentor = await Mentor.findOne({ name });

        if (existingMentor) { return res.status(401).json({ message: "Mentor already exists" }); }

        const newMentor = await Mentor.create({ name });

        if (!newMentor) { return res.status(500).json({ message: "Something went wrong" }); }

        // Save the mentor to the database
        // await mentor.save();

        console.log(`Mentor created successfully`)
        res.status(201).json({ message: 'Mentor created successfully', mentor: newMentor });
    } catch (error) {
        console.log(`error occurred while creating new Mentor: ${error.message}`)
        res.status(500).json({ error: 'An error occurred' });
    }
}


// Retrieve mentor Details by :ID
exports.getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(200).json(mentor);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving mentor', error });
    }
};


exports.assignStudentsToMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;

        const { studentIds } = req.body;

        // Check if mentor exists
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }



        /* Method 1 - Check if each student exists and assign mentor to them */
        // for (const studentId of studentIds) {
        //     const student = await Student.findById(studentId);
        //     if (!student) {
        //         return res.status(404).json({ message: `Student with ID ${studentId} not found` });
        //     }
        //     student.mentor = mentorId;
        //     await student.save();
        // }

        // /* -------------- Method 2 - Using Promise -------------------------- */

        const promises = studentIds.map(async (studentId) => {
            const student = await Student.findById(studentId);
            student.mentor ? student.previousMentor = student.mentor : "";
            student.mentor = mentor;
            await student.save();
        });

        // /* Wait for all the promises to resolve */
        await Promise.all(promises);
        // /* ------------------------------------------------------------------ */

        // Find all the students without a Mentor
        const students = await Student.find({ mentor: { $exists: false } });

        res.status(200).json({ message: 'Students assigned to mentor successfully', students: students });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning students to mentor', error });
    }
};






exports.showAssignedStudents = async (req, res) => {
    try {
        const { mentorId } = req.params;
        console.log(mentorId)

        const mentor = await Mentor.findById(mentorId);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        const students = await Student.find({ 'mentor.id': mentor._id });

        // Convert mentorId to ObjectId if needed
        const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
        console.log(mentor.id)
        console.log(mentorObjectId)
        const students2 = await Student.find({ 'mentor.name': mentor.name });

        // Find the mentor by its ID and populate the students field
        res.status(200).json(students2);


    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMSG: 'An error occurred', error });
    }
}