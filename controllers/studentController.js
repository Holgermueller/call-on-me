const Student = require("../models/studentsModel");
const mongoose = require("mongoose");

module.exports = {
  get_all_students: (req, res) => {
    Student.find({
      _id: req.params.id
    })
      .sort({ date: -1 })
      .exec()
      .then(dbModel => {
        res.status(200).json(dbModel);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },

  add_student: (req, res) => {
    const student = new Student({
      _id: new mongoose.Types.ObjectId(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      preferred_name: req.body.preferred_name
    });
    student
      .save(req.body)
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Student added!",
          createdStudent: {
            first_name: result.first_name,
            last_name: result.last_name,
            preferred_name: result.preferred_name
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(422).json({
          error: err
        });
      });
  },

  find_student_by_id: (req, res) => {
    Student.findById(req.params.id)
      .then(doc => res.status(200).json(doc))
      .catch(err => res.status(422).json(err));
  },

  edit_student_info: (req, res) => {
    Student.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove_student: (req, res) => {
    Student.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
