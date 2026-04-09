const express = require('express');
const router = express.Router();
const Student = require('../models/student');


// {POST API for creating a new student}

router.post('/',async (req,res) => {
    try {
       const newStudent = new Student(req.body) 
       if(newStudent.age < 18) {
        return res.status(400).json({ message: "Student must be at least 18 years old" })
       }
       const existingEmail = await Student.findOne({ email: newStudent.email })
       if(existingEmail) {
        return res.status(400).json({ message: "Email already exists" })
       }
       const existingPhone = await Student.findOne({ phone_number: newStudent.phone_number })
       if(existingPhone) {
        return res.status(400).json({ message: "Phone number already exists" })
       }
       const student = await newStudent.save()
       res.status(201).json(student)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// get API fro  the all students

router.get('/',async (req,res) => {
    try {
    const student = await Student.find()
    res.json(student)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router